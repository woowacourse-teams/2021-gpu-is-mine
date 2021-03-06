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

    @DisplayName("?????? ????????? ???????????? job ??? ?????? ????????? ????????? job ??? ????????????.")
    @Test
    void popJobByServerId() {
        JobResponse jobResponse = workerService.popJobByServerId(gpuServer.getId());

        assertThat(jobResponse).isNotNull();
        assertThat(jobResponse.getId()).isEqualTo(job2.getId());
    }

    @DisplayName("job ??? ?????? RUNNING ?????? ????????????.")
    @Test
    void changeJobStatusRunning() {
        assertThat(job2.getStatus()).isEqualTo(JobStatus.WAITING);

        workerService.updateJobStatus(job2.getId(), new WorkerJobRequest(JobStatus.RUNNING));

        assertThat(job2.getStatus()).isEqualTo(JobStatus.RUNNING);
    }

    @DisplayName("job ??? ?????? RUNNING ?????? ????????? ?????? ????????? ????????????")
    @Test
    void checkStartedTimeJobStatusRunning() {
        assertThat(job2.getStatus()).isEqualTo(JobStatus.WAITING);

        workerService.updateJobStatus(job2.getId(), new WorkerJobRequest(JobStatus.RUNNING));

        assertThat(job2.getStartedTime()).isNotNull();
    }

    @DisplayName("job ??? ?????? COMPLETED ?????? ????????????.")
    @Test
    void changeJobStatusCompleted() {
        // given
        assertThat(job1.getStatus()).isEqualTo(JobStatus.RUNNING);

        // when
        workerService.updateJobStatus(job1.getId(), new WorkerJobRequest(JobStatus.COMPLETED));

        // then
        assertThat(job1.getStatus()).isEqualTo(JobStatus.COMPLETED);
    }

    @DisplayName("job ??? ?????? COMPLETED ?????? ????????? ?????? ????????? ????????????")
    @Test
    void checkEndTimeJobStatusCompleted() {
        assertThat(job1.getStatus()).isEqualTo(JobStatus.RUNNING);

        workerService.updateJobStatus(job1.getId(), new WorkerJobRequest(JobStatus.COMPLETED));

        assertThat(job1.getEndedTime()).isNotNull();
    }

    @DisplayName("job ??? ???????????? ?????? job??? ?????? ???????????? ???????????? ??????")
    @Test
    void checkTime() {
        assertThat(job2.getStatus()).isEqualTo(JobStatus.WAITING);

        workerService.updateJobStatus(job2.getId(), new WorkerJobRequest(JobStatus.RUNNING));
        workerService.updateJobStatus(job2.getId(), new WorkerJobRequest(JobStatus.COMPLETED));

        assertThat(job2.getCreatedAt()).isNotNull();
        assertThat(job2.getStartedTime()).isNotNull();
        assertThat(job2.getEndedTime()).isNotNull();
    }

    @DisplayName("???????????? ?????? job status update ??????")
    @ParameterizedTest(name = "{displayName}::[{argumentsWithNames}]")
    @ValueSource(strings = {"canceled", "waiting"})
    void unsupportedJobStatusUpdate(String request) {
        JobStatus jobStatus = JobStatus.ignoreCaseValueOf(request);
        assertThatThrownBy(
                () -> workerService.updateJobStatus(job1.getId(), new WorkerJobRequest(jobStatus))
        ).isEqualTo(JobException.UNSUPPORTED_JOB_STATUS_UPDATE.getException());
    }

    @DisplayName("????????? n ????????? ????????? ???????????? ????????? ????????? ??????????????? ????????????.")
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
