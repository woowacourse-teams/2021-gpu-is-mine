package mine.is.gpu;

import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.gpuserver.domain.repository.GpuBoardRepository;
import mine.is.gpu.gpuserver.domain.repository.GpuServerRepository;
import mine.is.gpu.job.domain.Job;
import mine.is.gpu.job.domain.JobStatus;
import mine.is.gpu.job.domain.repository.JobRepository;
import mine.is.gpu.lab.domain.Lab;
import mine.is.gpu.lab.domain.repository.LabRepository;
import mine.is.gpu.member.application.MemberService;
import mine.is.gpu.member.domain.Member;
import mine.is.gpu.member.domain.repository.MemberRepository;
import mine.is.gpu.member.dto.request.MemberRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@PropertySource(value = {"classpath:application-db.properties"})
@Profile({"was1", "was2"})
@Component
public class DataLoader implements CommandLineRunner {
    private final LabRepository labRepository;
    private final GpuServerRepository gpuServerRepository;
    private final GpuBoardRepository gpuBoardRepository;
    private final MemberRepository memberRepository;
    private final JobRepository jobRepository;

    private final MemberService memberService;

    @Value("${db.member.email}")
    private String prodMemberEmail;
    @Value("${db.member.password}")
    private String prodMemberPassword;

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

        GpuServer gpuServer1 = new GpuServer("serverA", true, 1024L, 1024L, lab1);
        gpuServerRepository.save(gpuServer1);

        GpuBoard gpuBoard1 = new GpuBoard(true, 600L, "NVIDIA42", gpuServer1);
        gpuBoardRepository.save(gpuBoard1);

        GpuServer gpuServer2 = new GpuServer("serverB", true, 1024L, 1024L, lab1);
        gpuServerRepository.save(gpuServer2);

        GpuBoard gpuBoard2 = new GpuBoard(false, 700L, "NVIDIA Titan V", gpuServer2);
        gpuBoardRepository.save(gpuBoard2);

        GpuServer gpuServer3 = new GpuServer("serverC", true, 1024L, 1024L, lab1);
        gpuServerRepository.save(gpuServer3);

        GpuBoard gpuBoard3 = new GpuBoard(true, 670L, "RTX 6000", gpuServer3);
        gpuBoardRepository.save(gpuBoard3);

        GpuServer gpuServer4 = new GpuServer("serverD", false, 1024L, 1024L, lab1);
        gpuServerRepository.save(gpuServer4);

        GpuBoard gpuBoard4 = new GpuBoard(false, 300L, "RTX 2080 Ti", gpuServer4);
        gpuBoardRepository.save(gpuBoard4);

        Long savedMemberId1 = memberService
                .save(new MemberRequest(prodMemberEmail, prodMemberPassword, "name", "manager", lab1.getId()));
        Member member1 = memberRepository.findById(savedMemberId1).get();

        Job job1 = new Job("영화 리뷰 분석을 통한 긍정도 평가", JobStatus.WAITING, gpuBoard1, member1,
                "danny/movie_review", "80");
        jobRepository.save(job1);
    }
}
