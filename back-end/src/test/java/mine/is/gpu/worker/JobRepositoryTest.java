package mine.is.gpu.worker;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import mine.is.gpu.account.domain.Member;
import mine.is.gpu.account.domain.MemberType;
import mine.is.gpu.account.domain.repository.MemberRepository;
import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.gpuserver.domain.repository.GpuBoardRepository;
import mine.is.gpu.gpuserver.domain.repository.GpuServerRepository;
import mine.is.gpu.job.domain.Job;
import mine.is.gpu.job.domain.JobStatus;
import mine.is.gpu.job.domain.repository.JobRepository;
import mine.is.gpu.lab.domain.Lab;
import mine.is.gpu.lab.domain.repository.LabRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
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
        Lab lab = new Lab("lab");
        labRepository.save(lab);
        GpuServer gpuServer = new GpuServer("server", true, 1024L, 1024L, lab);
        gpuServerRepository.save(gpuServer);
        GpuBoard gpuBoard = new GpuBoard(true, 600L, "NVIDIA42", gpuServer);
        gpuBoardRepository.save(gpuBoard);
        Member member = new Member("email@email.com", "password", "name", MemberType.MANAGER, lab);
        memberRepository.save(member);
        Job job1 = new Job("job1", JobStatus.WAITING, gpuBoard, member, "metaData1", "10");
        jobRepository.save(job1);
        Job job2 = new Job("job2", JobStatus.RUNNING, gpuBoard, member, "metaData2", "10");
        jobRepository.save(job2);
        Job job3 = new Job("job2", JobStatus.WAITING, gpuBoard, member, "metaData3", "10");
        jobRepository.save(job3);

        // when
        List<Job> jobs = jobRepository.findAllByBoardIdAndStatusOrderById(gpuBoard.getId(), JobStatus.WAITING);

        // then
        assertThat(jobs.size()).isEqualTo(2);
        assertThat(jobs.get(0).getId()).isEqualTo(job1.getId());
        assertThat(jobs.get(1).getId()).isEqualTo(job3.getId());
    }
}
