package mine.is.gpu.worker.application;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.gpuserver.domain.repository.GpuBoardRepository;
import mine.is.gpu.gpuserver.domain.repository.GpuServerRepository;
import mine.is.gpu.job.domain.Job;
import mine.is.gpu.job.domain.JobStatus;
import mine.is.gpu.job.domain.repository.JobRepository;
import mine.is.gpu.job.dto.response.JobResponse;
import mine.is.gpu.job.exception.JobException;
import mine.is.gpu.lab.domain.Lab;
import mine.is.gpu.lab.domain.repository.LabRepository;
import mine.is.gpu.member.domain.Member;
import mine.is.gpu.member.domain.MemberType;
import mine.is.gpu.member.domain.repository.MemberRepository;
import mine.is.gpu.worker.domain.repository.LogRepository;
import mine.is.gpu.worker.dto.WorkerJobLogRequest;
import mine.is.gpu.worker.dto.WorkerJobRequest;
import mine.is.gpu.worker.dto.WorkerRequest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@DisplayName("[WorkerService]")
class WorkerServiceTest {
    @Autowired
    private LabRepository labRepository;
    @Autowired
    private GpuServerRepository gpuServerRepository;
    @Autowired
    private GpuBoardRepository gpuBoardRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private LogRepository logRepository;
    @Autowired
    private WorkerService workerService;

    private Lab lab;
    private GpuServer gpuServer;
    private GpuBoard gpuBoard;
    private Member member;
    private Job job1;
    private Job job2;

    @BeforeEach
    void setUp() {
        lab = new Lab("lab");
        labRepository.save(lab);
        gpuServer = new GpuServer("server", true, 1024L, 1024L, lab);
        gpuServerRepository.save(gpuServer);
        gpuBoard = new GpuBoard(true, 600L, "NVIDIA42", gpuServer);
        gpuBoardRepository.save(gpuBoard);
        member = new Member("email@email.com", "password", "name", MemberType.MANAGER, lab);
        memberRepository.save(member);
        job1 = new Job("job1", JobStatus.RUNNING, gpuBoard, member, "metaData1", "10");
        jobRepository.save(job1);
        job2 = new Job("job2", JobStatus.WAITING, gpuBoard, member, "metaData2", "10");
        jobRepository.save(job2);
    }

    @DisplayName("해당 서버에 대기중인 job 중 가장 처음에 들어온 job 을 가져온다.")
    @Test
    void popJobByServerId() {
        JobResponse jobResponse = workerService.popJobByServerId(gpuServer.getId());

        assertThat(jobResponse).isNotNull();
        assertThat(jobResponse.getId()).isEqualTo(job2.getId());
    }

    @DisplayName("job 의 상태 RUNNING 으로 변경한다.")
    @Test
    void changeJobStatusRunning() {
        assertThat(job2.getStatus()).isEqualTo(JobStatus.WAITING);

        workerService.updateJobStatus(job2.getId(), new WorkerJobRequest(JobStatus.RUNNING));

        assertThat(job2.getStatus()).isEqualTo(JobStatus.RUNNING);
    }

    @DisplayName("job 의 상태 COMPLETED 으로 변경한다.")
    @Test
    void changeJobStatusCompleted() {
        // given
        assertThat(job2.getStatus()).isEqualTo(JobStatus.WAITING);

        // when
        workerService.updateJobStatus(job2.getId(), new WorkerJobRequest(JobStatus.COMPLETED));

        // then
        assertThat(job2.getStatus()).isEqualTo(JobStatus.COMPLETED);
    }

    @DisplayName("서버가 n 분마다 상태를 알려주면 상태와 마지막 응답시간이 수정된다.")
    @Test
    void updateWorkerStatus() throws InterruptedException {
        // given
        assertThat(gpuServer.getIsOn()).isTrue();

        // when
        LocalDateTime now1 = LocalDateTime.now();
        workerService.updateWorkerStatus(gpuServer.getId(), new WorkerRequest(false, now1));

        // then
        assertThat(gpuServer.getIsOn()).isFalse();
        assertThat(gpuServer.getLastResponse()).isEqualTo(now1);

        // when
        Thread.sleep(10);
        LocalDateTime now2 = LocalDateTime.now();
        workerService.updateWorkerStatus(gpuServer.getId(), new WorkerRequest(true, now2));

        // then
        assertThat(gpuServer.getIsOn()).isTrue();
        assertThat(now1).isNotEqualTo(now2);
        assertThat(gpuServer.getLastResponse()).isEqualTo(now2);
    }

    @DisplayName("로그를 저장하는 경우")
    @Test
    void saveLog() {
        // then
        Assertions.assertDoesNotThrow(() -> {
            Long logId = workerService.saveLog(job1.getId(), new WorkerJobLogRequest("content"));
            assertThat(logId).isNotNull();
        });
    }

    @DisplayName("로그 저장에 실패하는 경우")
    @Test
    void saveLogFail() {
        // given
        Long notExistJobId = Long.MAX_VALUE;
        // then
        Assertions.assertThrows(JobException.JOB_NOT_FOUND.getException().getClass(), () ->
                workerService.saveLog(notExistJobId, new WorkerJobLogRequest("content")));
    }
}
