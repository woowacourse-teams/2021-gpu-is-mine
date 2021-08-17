package mine.is.gpu;

import java.time.LocalDateTime;
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
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Profile("local")
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
                .save(new MemberRequest("email@email.com", "password", "name", "manager", lab1.getId()));
        final Member member1 = memberRepository.findById(savedMemberId1).get();

        Long savedMemberId2 = memberService
                .save(new MemberRequest("test@test.com", "test1234!", "name", "manager", lab1.getId()));
        final Member member2 = memberRepository.findById(savedMemberId2).get();

        Job job1 = new Job("영화 리뷰 분석을 통한 긍정도 평가", JobStatus.WAITING, gpuBoard1, member1,
                "danny/movie_review", "80");
        jobRepository.save(job1);

        Job job2 = new Job("가짜 뉴스 검증을 위한 댓글 분류 학습", JobStatus.RUNNING, gpuBoard1, member1,
                "myagya/fake_news", "50");
        jobRepository.save(job2);
        job2.setStartedTime(LocalDateTime.now());

        Job job3 = new Job("신경망을 이용한 스포츠 경기 비디오와 텍스트 요약", JobStatus.COMPLETED, gpuBoard1, member1,
                "better/sports_analysis", "60");
        jobRepository.save(job3);
        job3.setStartedTime(LocalDateTime.now().minusHours(60));
        job3.setCompletedTime(LocalDateTime.now());

        Job job4 = new Job("보스턴 주택 가격 예측과 k-겹 검증", JobStatus.COMPLETED, gpuBoard1, member1,
                "ed/housing_prices", "70");
        jobRepository.save(job4);
        job4.setStartedTime(LocalDateTime.now().minusHours(60));
        job4.setCompletedTime(LocalDateTime.now());

        Job job5 = new Job("소셜 미디어 게시물을 기반으로 한 우울증 감정 분석", JobStatus.WAITING, gpuBoard1, member2,
                "wannte/social_media", "20");
        jobRepository.save(job5);

        Job job6 = new Job("교통 표지판 분류 학습", JobStatus.CANCELED, gpuBoard2, member2,
                "corgy/traffic_signs", "30");
        jobRepository.save(job6);

        Job job7 = new Job("CNN 모델을 활용한 마스크 인식 학습", JobStatus.WAITING, gpuBoard2, member1,
                "collin/mask_recognition", "50");
        jobRepository.save(job7);

        Job job8 = new Job("자연어 처리 : 문자-단위 RNN으로 이름 생성하기", JobStatus.RUNNING, gpuBoard3, member1,
                "danny/natural_language", "100");
        jobRepository.save(job8);
        job8.setStartedTime(LocalDateTime.now());

        Job job9 = new Job("유튜브 댓글 긍정도 평가 학습", JobStatus.WAITING, gpuBoard4, member2,
                "myagya/youtube_comments", "20");
        jobRepository.save(job9);

        Job job10 = new Job("망막 이미지 분류, 망막 질환 진단 학습", JobStatus.RUNNING, gpuBoard4, member2,
                "better/retina_classification", "10");
        jobRepository.save(job10);
        job10.setStartedTime(LocalDateTime.now());
    }
}
