package admin;

import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import admin.gpuserver.domain.repository.GpuBoardRepository;
import admin.gpuserver.domain.repository.GpuServerRepository;
import admin.job.domain.Job;
import admin.job.domain.JobStatus;
import admin.job.domain.repository.JobRepository;
import admin.lab.domain.Lab;
import admin.lab.domain.repository.LabRepository;
import admin.member.domain.Member;
import admin.member.domain.MemberType;
import admin.member.domain.repository.MemberRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Profile("dev")
@Component
public class DataLoader implements CommandLineRunner {
    private final LabRepository labRepository;
    private final GpuServerRepository gpuServerRepository;
    private final GpuBoardRepository gpuBoardRepository;
    private final MemberRepository memberRepository;
    private final JobRepository jobRepository;

    public DataLoader(LabRepository labRepository, GpuServerRepository gpuServerRepository,
            GpuBoardRepository gpuBoardRepository, MemberRepository memberRepository,
            JobRepository jobRepository) {
        this.labRepository = labRepository;
        this.gpuServerRepository = gpuServerRepository;
        this.gpuBoardRepository = gpuBoardRepository;
        this.memberRepository = memberRepository;
        this.jobRepository = jobRepository;
    }

    @Transactional
    @Override
    public void run(String... args) {
        Lab lab1 = new Lab("lab1");
        labRepository.save(lab1);

        GpuServer gpuServer1 = new GpuServer("server1", true, 1024L, 1024L, lab1);
        gpuServerRepository.save(gpuServer1);

        GpuBoard gpuBoard1 = new GpuBoard(true, 600L, "NVIDIA42", gpuServer1);
        gpuBoardRepository.save(gpuBoard1);

        GpuServer gpuServer2 = new GpuServer("server2", true, 1024L, 1024L, lab1);
        gpuServerRepository.save(gpuServer2);

        GpuBoard gpuBoard2 = new GpuBoard(false, 700L, "NVIDIA231", gpuServer2);
        gpuBoardRepository.save(gpuBoard2);

        GpuServer gpuServer3 = new GpuServer("server3", true, 1024L, 1024L, lab1);
        gpuServerRepository.save(gpuServer3);

        GpuBoard gpuBoard3 = new GpuBoard(true, 670L, "NVIDIA13", gpuServer3);
        gpuBoardRepository.save(gpuBoard3);

        GpuServer gpuServer4 = new GpuServer("server4", false, 1024L, 1024L, lab1);
        gpuServerRepository.save(gpuServer4);

        GpuBoard gpuBoard4 = new GpuBoard(false, 300L, "NVIDIA24", gpuServer4);
        gpuBoardRepository.save(gpuBoard4);

        Member member1 = new Member("email@email.com", "password", "name1", MemberType.MANAGER, lab1);
        memberRepository.save(member1);

        Job job1 = new Job("job1", JobStatus.WAITING, gpuBoard1, member1);
        jobRepository.save(job1);

        Job job2 = new Job("job2", JobStatus.RUNNING, gpuBoard1, member1);
        jobRepository.save(job2);

        Job job3 = new Job("job3", JobStatus.COMPLETED, gpuBoard1, member1);
        jobRepository.save(job3);

        Job job4 = new Job("job4", JobStatus.COMPLETED, gpuBoard1, member1);
        jobRepository.save(job4);

        Job job5 = new Job("job5", JobStatus.WAITING, gpuBoard1, member1);
        jobRepository.save(job5);

        Job job6 = new Job("job6", JobStatus.CANCELED, gpuBoard2, member1);
        jobRepository.save(job6);

        Job job7 = new Job("job7", JobStatus.WAITING, gpuBoard2, member1);
        jobRepository.save(job7);

        Job job8 = new Job("job8", JobStatus.RUNNING, gpuBoard3, member1);
        jobRepository.save(job8);

        Job job9 = new Job("job9", JobStatus.WAITING, gpuBoard4, member1);
        jobRepository.save(job9);

        Job job10 = new Job("job10", JobStatus.RUNNING, gpuBoard4, member1);
        jobRepository.save(job10);
    }
}
