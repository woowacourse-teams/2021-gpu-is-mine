package mine.is.gpu.worker.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.time.LocalDateTime;
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
import mine.is.gpu.job.dto.response.JobResponse;
import mine.is.gpu.job.exception.JobException;
import mine.is.gpu.lab.domain.Lab;
import mine.is.gpu.lab.domain.repository.LabRepository;
import mine.is.gpu.worker.dto.WorkerJobRequest;
import mine.is.gpu.worker.dto.WorkerRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@ActiveProfiles("test")
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

    @DisplayName("job 의 상태 RUNNING 으로 변경시 시작 시간이 기록된다")
    @Test
    void checkStartedTimeJobStatusRunning() {
        assertThat(job2.getStatus()).isEqualTo(JobStatus.WAITING);

        workerService.updateJobStatus(job2.getId(), new WorkerJobRequest(JobStatus.RUNNING));

        assertThat(job2.getStartedTime()).isNotNull();
    }

    @DisplayName("job 의 상태 COMPLETED 으로 변경한다.")
    @Test
    void changeJobStatusCompleted() {
        // given
        assertThat(job1.getStatus()).isEqualTo(JobStatus.RUNNING);

        // when
        workerService.updateJobStatus(job1.getId(), new WorkerJobRequest(JobStatus.COMPLETED));

        // then
        assertThat(job1.getStatus()).isEqualTo(JobStatus.COMPLETED);
    }

    @DisplayName("job 의 상태 COMPLETED 으로 변경시 종료 시간이 기록된다")
    @Test
    void checkEndTimeJobStatusCompleted() {
        assertThat(job1.getStatus()).isEqualTo(JobStatus.RUNNING);

        workerService.updateJobStatus(job1.getId(), new WorkerJobRequest(JobStatus.COMPLETED));

        assertThat(job1.getEndedTime()).isNotNull();
    }

    @DisplayName("job 이 완료되면 해당 job은 모든 시간값이 입력되어 있다")
    @Test
    void checkTime() {
        assertThat(job2.getStatus()).isEqualTo(JobStatus.WAITING);

        workerService.updateJobStatus(job2.getId(), new WorkerJobRequest(JobStatus.RUNNING));
        workerService.updateJobStatus(job2.getId(), new WorkerJobRequest(JobStatus.COMPLETED));

        assertThat(job2.getCreatedAt()).isNotNull();
        assertThat(job2.getStartedTime()).isNotNull();
        assertThat(job2.getEndedTime()).isNotNull();
    }

    @DisplayName("허용되지 않는 job status update 요청")
    @ParameterizedTest(name = "{displayName}::[{argumentsWithNames}]")
    @ValueSource(strings = {"canceled", "waiting"})
    void unsupportedJobStatusUpdate(String request) {
        JobStatus jobStatus = JobStatus.ignoreCaseValueOf(request);
        assertThatThrownBy(
                () -> workerService.updateJobStatus(job1.getId(), new WorkerJobRequest(jobStatus))
        ).isEqualTo(JobException.UNSUPPORTED_JOB_STATUS_UPDATE.getException());
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

}
