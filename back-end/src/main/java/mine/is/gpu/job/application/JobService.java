package mine.is.gpu.job.application;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import mine.is.gpu.account.domain.Member;
import mine.is.gpu.account.domain.repository.MemberRepository;
import mine.is.gpu.account.exception.MemberException;
import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.gpuserver.domain.repository.GpuBoardRepository;
import mine.is.gpu.gpuserver.domain.repository.GpuServerRepository;
import mine.is.gpu.gpuserver.exception.GpuBoardException;
import mine.is.gpu.gpuserver.exception.GpuServerException;
import mine.is.gpu.infra.JobEvent;
import mine.is.gpu.job.domain.Job;
import mine.is.gpu.job.domain.JobStatus;
import mine.is.gpu.job.domain.WaitingJobs;
import mine.is.gpu.job.domain.repository.JobRepository;
import mine.is.gpu.job.domain.repository.LogRepository;
import mine.is.gpu.job.domain.repository.ParsedLogRepository;
import mine.is.gpu.job.dto.request.JobRequest;
import mine.is.gpu.job.dto.request.JobUpdateRequest;
import mine.is.gpu.job.dto.response.JobResponse;
import mine.is.gpu.job.dto.response.JobResponses;
import mine.is.gpu.job.dto.response.LogsResponse;
import mine.is.gpu.job.dto.response.ParsedLogResponses;
import mine.is.gpu.job.exception.JobException;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationEventPublisherAware;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
public class JobService implements ApplicationEventPublisherAware {

    private final JobRepository jobRepository;
    private final GpuServerRepository gpuServerRepository;
    private final GpuBoardRepository gpuBoardRepository;
    private final MemberRepository memberRepository;
    private final LogRepository logRepository;
    private final ParsedLogRepository parsedLogRepository;
    private ApplicationEventPublisher eventPublisher;

    public JobService(JobRepository jobRepository,
                      GpuServerRepository gpuServerRepository,
                      GpuBoardRepository gpuBoardRepository,
                      MemberRepository memberRepository, LogRepository logRepository,
                      ParsedLogRepository parsedLogRepository) {
        this.jobRepository = jobRepository;
        this.gpuServerRepository = gpuServerRepository;
        this.gpuBoardRepository = gpuBoardRepository;
        this.memberRepository = memberRepository;
        this.logRepository = logRepository;
        this.parsedLogRepository = parsedLogRepository;
    }

    @Override
    public void setApplicationEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
        this.eventPublisher = applicationEventPublisher;
    }

    @Transactional
    public Long save(Long memberId, JobRequest jobRequest) {
        Long serverId = jobRequest.getGpuServerId();
        Job job = jobRequest.toEntity(findBoardByServerId(serverId), findMemberById(memberId));
        job.calculateExpectation(findLastInGpuBoard(job.getGpuBoard()));
        jobRepository.save(job);
        eventPublisher.publishEvent(new JobEvent(this, job));
        return job.getId();
    }

    private Optional<Job> findLastInGpuBoard(GpuBoard gpuBoard) {
        return jobRepository.findFirstByGpuBoardIdOrderByIdDesc(gpuBoard.getId());
    }

    @Transactional
    public void cancel(Long jobId) {
        Job job = findJobById(jobId);
        job.cancel();
        updateJobExpectations(job.getGpuBoard());
        eventPublisher.publishEvent(new JobEvent(this, job));
    }

    private void updateJobExpectations(GpuBoard gpuBoard) {
        Optional<Job> runningJob = jobRepository.findFirstByGpuBoardIdAndStatus(gpuBoard.getId(), JobStatus.RUNNING);
        runningJob.ifPresent(it -> waitingJobsInGpuBoard(gpuBoard).syncExpectation(it.getExpectedCompletedTime()));
    }

    private WaitingJobs waitingJobsInGpuBoard(GpuBoard gpuBoard) {
        return new WaitingJobs(jobRepository.findAllByBoardIdAndStatusOrderById(gpuBoard.getId(), JobStatus.WAITING));
    }

    @Transactional(readOnly = true)
    public JobResponse findById(Long jobId) {
        Job job = findJobById(jobId);
        return JobResponse.of(job);
    }

    @Transactional(readOnly = true)
    public JobResponses findJobs(Long labId, Long serverId, String status, Pageable pageable) {
        if (Objects.isNull(serverId)) {
            if (StringUtils.hasText(status)) {
                return findJobsOfLabByStatus(labId, status, pageable);
            }
            return findAllJobsOfLab(labId, pageable);
        }

        checkServerInLab(serverId, labId);
        if (StringUtils.hasText(status)) {
            return findJobsOfServerByStatus(serverId, status, pageable);
        }
        return findAllJobsOfServer(serverId, pageable);
    }

    @Transactional(readOnly = true)
    public JobResponses findJobsOfMember(Long memberId, String status, Pageable pageable) {
        if (StringUtils.hasText(status)) {
            return findJobsOfMemberByStatus(memberId, status, pageable);
        }
        return findAllJobsOfMember(memberId, pageable);
    }

    @Transactional
    public void update(Long jobId, JobUpdateRequest jobUpdateRequest) {
        Job job = findJobById(jobId);
        job.setName(jobUpdateRequest.getName());
    }

    private JobResponses findJobsOfLabByStatus(Long labId, String status, Pageable pageable) {
        List<Job> jobs = new ArrayList<>();

        for (GpuServer gpuServer : gpuServerRepository.findAllByLabId(labId)) {
            GpuBoard gpuBoard = findBoardByServerId(gpuServer.getId());
            JobStatus jobStatus = JobStatus.ignoreCaseValueOf(status);
            jobs.addAll(jobRepository.findAllByGpuBoardIdAndStatus(gpuBoard.getId(), jobStatus));
        }
        return JobResponses.of(jobsOfPage(jobs, pageable));
    }

    private JobResponses findAllJobsOfLab(Long labId, Pageable pageable) {
        List<Job> jobs = new ArrayList<>();

        for (GpuServer gpuServer : gpuServerRepository.findAllByLabId(labId)) {
            GpuBoard gpuBoard = findBoardByServerId(gpuServer.getId());
            jobs.addAll(jobRepository.findAllByGpuBoardId(gpuBoard.getId()));
        }
        return JobResponses.of(jobsOfPage(jobs, pageable));
    }

    private JobResponses findJobsOfServerByStatus(Long serverId, String status, Pageable pageable) {
        GpuBoard gpuBoard = findBoardByServerId(serverId);
        JobStatus jobStatus = JobStatus.ignoreCaseValueOf(status);

        if (Objects.isNull(pageable)) {
            return JobResponses.of(jobRepository.findAllByGpuBoardIdAndStatus(gpuBoard.getId(), jobStatus));
        }
        return JobResponses.of(jobRepository.findAllByGpuBoardIdAndStatus(gpuBoard.getId(), jobStatus, pageable));
    }

    private JobResponses findAllJobsOfServer(Long serverId, Pageable pageable) {
        GpuBoard gpuBoard = findBoardByServerId(serverId);

        if (Objects.isNull(pageable)) {
            return JobResponses.of(jobRepository.findAllByGpuBoardId(gpuBoard.getId()));
        }
        return JobResponses.of(jobRepository.findAllByGpuBoardId(gpuBoard.getId(), pageable));
    }

    private JobResponses findAllJobsOfMember(Long memberId, Pageable pageable) {
        if (Objects.isNull(pageable)) {
            return JobResponses.of(jobRepository.findAllByMemberId(memberId));
        }
        return JobResponses.of(jobRepository.findAllByMemberId(memberId, pageable));
    }

    private JobResponses findJobsOfMemberByStatus(Long memberId, String status, Pageable pageable) {
        JobStatus jobStatus = JobStatus.ignoreCaseValueOf(status);
        if (Objects.isNull(pageable)) {
            return JobResponses.of(jobRepository.findAllByMemberIdAndStatus(memberId, jobStatus));
        }
        return JobResponses.of(jobRepository.findAllByMemberIdAndStatus(memberId, jobStatus, pageable));
    }

    private GpuBoard findBoardByServerId(Long gpuServerId) {
        return gpuBoardRepository.findByGpuServerId(gpuServerId)
                .orElseThrow(GpuBoardException.GPU_BOARD_NOT_FOUND::getException);
    }

    private Job findJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(JobException.JOB_NOT_FOUND::getException);
    }

    private Member findMemberById(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(MemberException.MEMBER_NOT_FOUND::getException);
    }

    public void checkServerInLab(Long serverId, Long labId) {
        gpuServerRepository
                .findByIdAndLabId(serverId, labId)
                .orElseThrow(GpuServerException.UNMATCHED_SERVER_WITH_LAB::getException);
    }

    public LogsResponse findLogAllById(Long jobId) {
        return LogsResponse.of(logRepository.findByJobIdOrderByTime(jobId));
    }

    public ParsedLogResponses findParsedLogById(Long jobId) {
        return ParsedLogResponses.of(parsedLogRepository.findByJobIdOrderByCurrentEpoch(jobId));
    }

    private List<Job> jobsOfPage(List<Job> jobs, Pageable pageable) {
        if (Objects.isNull(pageable)) {
            return jobs;
        }

        int totalCount = jobs.size();
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), totalCount);

        if (start > end) {
            return Collections.emptyList();
        }

        PageImpl<Job> jobsInPage = new PageImpl<>(jobs.subList(start, end), pageable, totalCount);
        return jobsInPage.stream().collect(Collectors.toList());
    }
}
