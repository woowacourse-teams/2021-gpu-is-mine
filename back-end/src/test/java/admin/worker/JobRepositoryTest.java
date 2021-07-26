package admin.worker;

import static org.assertj.core.api.Assertions.assertThat;

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
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class JobRepositoryTest {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private GpuServerRepository gpuServerRepository;

    @Autowired
    private LabRepository labRepository;

    @Autowired
    private GpuBoardRepository gpuBoardRepository;

    @Autowired
    private MemberRepository memberRepository;

    @DisplayName("특정 BoardId에 해당하는 대기중인 jobs을 id 순서대로 정렬하여 가져온다.")
    @Test
    void findAllByBoardIdByOrderById() {
        // given
        Lab lab1 = new Lab("lab1");
        labRepository.save(lab1);
        GpuServer gpuServer1 = new GpuServer("server1", true, 1024L, 1024L, lab1);
        gpuServerRepository.save(gpuServer1);
        GpuBoard gpuBoard1 = new GpuBoard(true, 600L, "NVIDIA42", gpuServer1);
        gpuBoardRepository.save(gpuBoard1);
        Member member1 = new Member("email@email.com", "password", "name1", MemberType.MANAGER, lab1);
        memberRepository.save(member1);
        Job job1 = new Job("job1", JobStatus.WAITING, gpuBoard1, member1);
        jobRepository.save(job1);
        Job job2 = new Job("job2", JobStatus.RUNNING, gpuBoard1, member1);
        jobRepository.save(job2);
        Job job3 = new Job("job2", JobStatus.WAITING, gpuBoard1, member1);
        jobRepository.save(job3);

        // when
        List<Job> jobs = jobRepository.findAllByBoardIdAndStatusOrderById(gpuBoard1.getId(), JobStatus.WAITING);

        // then
        assertThat(jobs.size()).isEqualTo(2);
        assertThat(jobs.get(0).getId()).isEqualTo(job1.getId());
        assertThat(jobs.get(1).getId()).isEqualTo(job3.getId());
    }

}
