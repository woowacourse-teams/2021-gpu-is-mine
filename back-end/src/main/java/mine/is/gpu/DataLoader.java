package mine.is.gpu;

import mine.is.gpu.gpuserver.domain.repository.GpuBoardRepository;
import mine.is.gpu.gpuserver.domain.repository.GpuServerRepository;
import mine.is.gpu.job.domain.repository.JobRepository;
import mine.is.gpu.lab.domain.Lab;
import mine.is.gpu.lab.domain.repository.LabRepository;
import mine.is.gpu.member.application.MemberService;
import mine.is.gpu.member.domain.Member;
import mine.is.gpu.member.domain.repository.MemberRepository;
import mine.is.gpu.member.dto.request.MemberRequest;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Profile("prod")
@Component
public class DataLoader implements CommandLineRunner {
    private final LabRepository labRepository;
    private final GpuServerRepository gpuServerRepository;
    private final GpuBoardRepository gpuBoardRepository;
    private final MemberRepository memberRepository;
    private final JobRepository jobRepository;

    private final MemberService memberService;

    public DataLoader(LabRepository labRepository,
                      GpuServerRepository gpuServerRepository,
                      GpuBoardRepository gpuBoardRepository, MemberRepository memberRepository,
                      JobRepository jobRepository, MemberService memberService) {
        this.labRepository = labRepository;
        this.gpuServerRepository = gpuServerRepository;
        this.gpuBoardRepository = gpuBoardRepository;
        this.memberRepository = memberRepository;
        this.jobRepository = jobRepository;
        this.memberService = memberService;
    }

    @Transactional
    @Override
    public void run(String... args) {
        Lab lab1 = new Lab("GIM Lab - woowacourse");
        labRepository.save(lab1);

        Long savedMemberId2 = memberService
                .save(new MemberRequest("test@test.com", "test1234!", "name", "manager", lab1.getId()));
        final Member member2 = memberRepository.findById(savedMemberId2).get();
    }
}
