package mine.is.gpu.job.application;

import mine.is.gpu.account.domain.Member;
import mine.is.gpu.account.domain.repository.MemberRepository;
import mine.is.gpu.account.exception.MemberException;
import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.repository.GpuBoardRepository;
import mine.is.gpu.gpuserver.exception.GpuBoardException;
import mine.is.gpu.job.domain.Job;
import mine.is.gpu.job.dto.request.JobRequest;
import org.springframework.stereotype.Component;

@Component
public class JobMapper {
    private final MemberRepository memberRepository;
    private final GpuBoardRepository gpuBoardRepository;

    public JobMapper(MemberRepository memberRepository,
                     GpuBoardRepository gpuBoardRepository) {
        this.memberRepository = memberRepository;
        this.gpuBoardRepository = gpuBoardRepository;
    }

    public Job mapFrom(Long memberId, JobRequest jobRequest) {
        GpuBoard gpuBoard = gpuBoardRepository.findByGpuServerId(jobRequest.getGpuServerId())
                .orElseThrow(GpuBoardException.GPU_BOARD_NOT_FOUND::getException);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberException.MEMBER_NOT_FOUND::getException);
        return new Job(
                jobRequest.getName(),
                gpuBoard,
                member,
                jobRequest.getMetaData(),
                jobRequest.getExpectedTime());
    }
}
