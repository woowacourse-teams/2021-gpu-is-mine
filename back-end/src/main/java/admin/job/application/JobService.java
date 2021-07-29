package admin.job.application;

import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import admin.gpuserver.domain.repository.GpuBoardRepository;
import admin.gpuserver.domain.repository.GpuServerRepository;
import admin.gpuserver.exception.GpuBoardException;
import admin.gpuserver.exception.GpuServerException;
import admin.job.domain.Job;
import admin.job.domain.JobStatus;
import admin.job.domain.repository.JobRepository;
import admin.job.dto.request.JobRequest;
import admin.job.dto.response.JobResponse;
import admin.job.dto.response.JobResponses;
import admin.job.exception.JobException;
import admin.mail.MailDto;
import admin.member.domain.Member;
import admin.member.domain.repository.MemberRepository;
import admin.member.exception.MemberException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
public class JobService {
    private JobRepository jobRepository;
    private GpuServerRepository gpuServerRepository;
    private GpuBoardRepository gpuBoardRepository;
    private MemberRepository memberRepository;

    public JobService(JobRepository jobRepository, GpuServerRepository gpuServerRepository,
            GpuBoardRepository gpuBoardRepository, MemberRepository memberRepository) {
        this.jobRepository = jobRepository;
        this.gpuServerRepository = gpuServerRepository;
        this.gpuBoardRepository = gpuBoardRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public Long save(Long memberId, JobRequest jobRequest) {
        GpuBoard gpuBoard = findLiveBoardByServerId(jobRequest.getGpuServerId());
        Job job = new Job(jobRequest.getName(), gpuBoard, findMemberById(memberId));
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
            GpuBoard gpuBoard = findLiveBoardByServerId(gpuServer.getId());
            JobStatus jobStatus = JobStatus.ignoreCaseValueOf(status);
            jobs.addAll(jobRepository.findAllByGpuBoardIdAndStatus(gpuBoard.getId(), jobStatus));
        }

        return JobResponses.of(jobs);
    }

    private JobResponses findAllJobsOfLab(Long labId) {
        List<Job> jobs = new ArrayList<>();

        for (GpuServer gpuServer : gpuServerRepository.findAllByLabId(labId)) {
            GpuBoard gpuBoard = findLiveBoardByServerId(gpuServer.getId());
            jobs.addAll(jobRepository.findAllByGpuBoardId(gpuBoard.getId()));
        }
        return JobResponses.of(jobs);
    }

    private JobResponses findJobsOfServerByStatus(Long serverId, String status) {
        GpuBoard gpuBoard = findLiveBoardByServerId(serverId);
        JobStatus jobStatus = JobStatus.ignoreCaseValueOf(status);
        return JobResponses
                .of(jobRepository.findAllByGpuBoardIdAndStatus(gpuBoard.getId(), jobStatus));
    }

    private JobResponses findAllJobsOfServer(Long serverId) {
        GpuBoard gpuBoard = findLiveBoardByServerId(serverId);
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

    private GpuBoard findLiveBoardByServerId(Long gpuServerId) {
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
