package admin.job.application;

import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.repository.GpuBoardRepository;
import admin.gpuserver.exception.GpuBoardException;
import admin.job.domain.Job;
import admin.job.domain.repository.JobRepository;
import admin.job.dto.request.JobRequest;
import admin.job.dto.response.JobResponse;
import admin.job.exception.JobException;
import admin.member.domain.Member;
import admin.member.domain.repository.MemberRepository;
import admin.member.exception.MemberException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class JobService {

    private JobRepository jobRepository;
    private GpuBoardRepository gpuBoardRepository;
    private MemberRepository memberRepository;

    public JobService(JobRepository jobRepository,
            GpuBoardRepository gpuBoardRepository,
            MemberRepository memberRepository) {
        this.jobRepository = jobRepository;
        this.gpuBoardRepository = gpuBoardRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public Long insert(Long memberId, JobRequest jobRequest) {
        GpuBoard gpuBoard = gpuBoardRepository.findByGpuServerId(jobRequest.getGpuServerId())
                .orElseThrow(GpuBoardException.GPU_BOARD_NOT_FOUND::getException);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberException.MEMBER_NOT_FOUND::getException);

        Job newJob = jobRepository.save(new Job(jobRequest.getName(), gpuBoard, member));
        gpuBoard.addJob(newJob);

        return newJob.getId();
    }

    @Transactional(readOnly = true)
    public JobResponse findById(Long jobId) {
        Job job = findJobById(jobId);

        return JobResponse.of(job);
    }

    @Transactional
    public void cancel(Long memberId, Long jobId) {
        Job job = jobRepository.findByIdAndMemberId(jobId, memberId)
                .orElseThrow(JobException.JOB_NOT_FOUND::getException);

        GpuBoard gpuBoard = job.getGpuBoard();
        gpuBoard.cancel(job);
    }

    private Job findJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(JobException.JOB_NOT_FOUND::getException);
    }
}
