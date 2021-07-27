package admin.job.application;

import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import admin.gpuserver.domain.repository.GpuBoardRepository;
import admin.gpuserver.domain.repository.GpuServerRepository;
import admin.gpuserver.exception.GpuBoardException;
import admin.job.domain.Job;
import admin.job.domain.JobStatus;
import admin.job.domain.repository.JobRepository;
import admin.job.dto.request.JobRequest;
import admin.job.dto.response.JobResponse;
import admin.job.dto.response.JobResponses;
import admin.job.exception.JobException;
import admin.member.domain.Member;
import admin.member.domain.repository.MemberRepository;
import admin.member.exception.MemberException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public Long insert(Long memberId, JobRequest jobRequest) {
        GpuBoard gpuBoard = findAliveBoardByServerId(jobRequest.getGpuServerId());

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
    public JobResponses findJobsOfLabByStatus(Long labId, String status) {
        List<Job> jobs = new ArrayList<>();

        for (GpuServer gpuServer : gpuServerRepository.findByLabIdAndDeletedFalse(labId)) {
            GpuBoard gpuBoard = findAliveBoardByServerId(gpuServer.getId());
            jobs.addAll(
                    jobRepository.findAllByGpuBoardIdAndStatus(gpuBoard.getId(), JobStatus.ignoreCaseValueOf(status)));
        }

        return JobResponses.of(jobs);
    }

    @Transactional(readOnly = true)
    public JobResponses findAllJobsOfLab(Long labId) {
        List<Job> jobs = new ArrayList<>();

        for (GpuServer gpuServer : gpuServerRepository.findByLabIdAndDeletedFalse(labId)) {
            GpuBoard gpuBoard = findAliveBoardByServerId(gpuServer.getId());
            jobs.addAll(jobRepository.findAllByGpuBoardId(gpuBoard.getId()));
        }

        return JobResponses.of(jobs);
    }

    @Transactional(readOnly = true)
    public JobResponses findJobsOfServerByStatus(Long serverId, String status) {
        GpuBoard gpuBoard = findAliveBoardByServerId(serverId);
        return JobResponses
                .of(jobRepository.findAllByGpuBoardIdAndStatus(gpuBoard.getId(), JobStatus.ignoreCaseValueOf(status)));
    }

    @Transactional(readOnly = true)
    public JobResponses findAllJobsOfServer(Long serverId) {
        GpuBoard gpuBoard = findAliveBoardByServerId(serverId);
        return JobResponses.of(jobRepository.findAllByGpuBoardId(gpuBoard.getId()));
    }

    @Transactional(readOnly = true)
    public JobResponses findAllJobsByMember(Long memberId) {
        List<Job> jobs = jobRepository.findAllByMemberId(memberId);

        return JobResponses.of(jobs);
    }

    @Transactional(readOnly = true)
    public JobResponses findJobsByMemberByStatus(Long memberId, String status) {
        List<Job> jobs = jobRepository.findAllByMemberIdAndStatus(memberId, JobStatus.ignoreCaseValueOf(status));

        return JobResponses.of(jobs);
    }

    private GpuBoard findAliveBoardByServerId(Long gpuServerId) {
        GpuBoard gpuBoard = gpuBoardRepository.findByGpuServerId(gpuServerId)
                .orElseThrow(GpuBoardException.GPU_BOARD_NOT_FOUND::getException);
        gpuBoard.checkServerAlive();
        return gpuBoard;
    }

    private Job findJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(JobException.JOB_NOT_FOUND::getException);
    }

    private Member findMemberById(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(MemberException.MEMBER_NOT_FOUND::getException);
    }
}
