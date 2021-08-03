package gpu.is.mine.job.application;

import gpu.is.mine.gpuserver.domain.GpuBoard;
import gpu.is.mine.gpuserver.domain.GpuServer;
import gpu.is.mine.gpuserver.domain.repository.GpuBoardRepository;
import gpu.is.mine.gpuserver.domain.repository.GpuServerRepository;
import gpu.is.mine.gpuserver.exception.GpuBoardException;
import gpu.is.mine.gpuserver.exception.GpuServerException;
import gpu.is.mine.job.domain.Job;
import gpu.is.mine.job.domain.JobStatus;
import gpu.is.mine.job.domain.repository.JobRepository;
import gpu.is.mine.job.dto.request.JobRequest;
import gpu.is.mine.job.dto.response.JobResponse;
import gpu.is.mine.job.dto.response.JobResponses;
import gpu.is.mine.job.exception.JobException;
import gpu.is.mine.mail.MailDto;
import gpu.is.mine.member.domain.Member;
import gpu.is.mine.member.domain.repository.MemberRepository;
import gpu.is.mine.member.exception.MemberException;
import gpu.is.mine.worker.domain.repository.LogRepository;
import gpu.is.mine.worker.dto.LogsResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final GpuServerRepository gpuServerRepository;
    private final GpuBoardRepository gpuBoardRepository;
    private final MemberRepository memberRepository;
    private final LogRepository logRepository;

    public JobService(JobRepository jobRepository,
            GpuServerRepository gpuServerRepository,
            GpuBoardRepository gpuBoardRepository,
            MemberRepository memberRepository, LogRepository logRepository) {
        this.jobRepository = jobRepository;
        this.gpuServerRepository = gpuServerRepository;
        this.gpuBoardRepository = gpuBoardRepository;
        this.memberRepository = memberRepository;
        this.logRepository = logRepository;
    }

    @Transactional
    public Long save(Long memberId, JobRequest jobRequest) {
        Long serverId = jobRequest.getGpuServerId();
        Job job = jobRequest.toEntity(findBoardByServerId(serverId), findMemberById(memberId));
        jobRepository.save(job);
        return job.getId();
    }

    @Transactional
    public void cancel(Long jobId) {
        Job job = findJobById(jobId);
        job.cancel();
    }

    @Transactional(readOnly = true)
    public JobResponse findById(Long jobId) {
        Job job = findJobById(jobId);
        return JobResponse.of(job);
    }

    @Transactional(readOnly = true)
    public JobResponses findJobs(Long labId, Long serverId, String status) {
        if (Objects.isNull(serverId)) {

            if (StringUtils.hasText(status)) {
                return findJobsOfLabByStatus(labId, status);
            }
            return findAllJobsOfLab(labId);
        }

        checkServerInLab(serverId, labId);
        if (StringUtils.hasText(status)) {
            return findJobsOfServerByStatus(serverId, status);
        }
        return findAllJobsOfServer(serverId);
    }

    private JobResponses findJobsOfLabByStatus(Long labId, String status) {
        List<Job> jobs = new ArrayList<>();

        for (GpuServer gpuServer : gpuServerRepository.findAllByLabId(labId)) {
            GpuBoard gpuBoard = findBoardByServerId(gpuServer.getId());
            JobStatus jobStatus = JobStatus.ignoreCaseValueOf(status);
            jobs.addAll(jobRepository.findAllByGpuBoardIdAndStatus(gpuBoard.getId(), jobStatus));
        }

        return JobResponses.of(jobs);
    }

    private JobResponses findAllJobsOfLab(Long labId) {
        List<Job> jobs = new ArrayList<>();

        for (GpuServer gpuServer : gpuServerRepository.findAllByLabId(labId)) {
            GpuBoard gpuBoard = findBoardByServerId(gpuServer.getId());
            jobs.addAll(jobRepository.findAllByGpuBoardId(gpuBoard.getId()));
        }
        return JobResponses.of(jobs);
    }

    private JobResponses findJobsOfServerByStatus(Long serverId, String status) {
        GpuBoard gpuBoard = findBoardByServerId(serverId);
        JobStatus jobStatus = JobStatus.ignoreCaseValueOf(status);
        return JobResponses
                .of(jobRepository.findAllByGpuBoardIdAndStatus(gpuBoard.getId(), jobStatus));
    }

    private JobResponses findAllJobsOfServer(Long serverId) {
        GpuBoard gpuBoard = findBoardByServerId(serverId);
        return JobResponses.of(jobRepository.findAllByGpuBoardId(gpuBoard.getId()));
    }

    @Transactional(readOnly = true)
    public JobResponses findJobsOfMember(Long memberId, String status) {
        if (StringUtils.hasText(status)) {
            return findJobsOfMemberByStatus(memberId, status);
        }
        return findAllJobsOfMember(memberId);
    }

    private JobResponses findAllJobsOfMember(Long memberId) {
        List<Job> jobs = jobRepository.findAllByMemberId(memberId);
        return JobResponses.of(jobs);
    }

    private JobResponses findJobsOfMemberByStatus(Long memberId, String status) {
        List<Job> jobs = jobRepository
                .findAllByMemberIdAndStatus(memberId, JobStatus.ignoreCaseValueOf(status));
        return JobResponses.of(jobs);
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

    public MailDto mailDtoOfJob(Long jobId) {
        Job job = findJobById(jobId);
        Member member = job.getMember();
        return new MailDto(member.getEmail(), job.getName());
    }

    public LogsResponse findLogAllById(Long jobId) {
        return LogsResponse.of(logRepository.findAllByJobId(jobId));
    }
}
