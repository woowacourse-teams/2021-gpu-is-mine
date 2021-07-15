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

@Component
@Profile("!prod && !test")
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

    @Override
    public void run(String... args) throws Exception {
        Lab lab1 = new Lab("lab1");
        labRepository.save(lab1);
        GpuServer gpuServer1 = new GpuServer("server1", true, 1024L, 1024L, lab1);
        gpuServerRepository.save(gpuServer1);
        GpuBoard gpuBoard1 = new GpuBoard(false, 600L, "NVIDIA", gpuServer1);
        gpuBoardRepository.save(gpuBoard1);
        Member member1 = new Member("email@email.com", "password", "name1", MemberType.MANAGER, lab1);
        Job job1 = new Job("job1", JobStatus.WAITING, gpuBoard1, member1);
        jobRepository.save(job1);
    }
}
