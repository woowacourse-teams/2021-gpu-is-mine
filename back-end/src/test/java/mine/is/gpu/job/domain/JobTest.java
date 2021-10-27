package mine.is.gpu.job.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import mine.is.gpu.account.domain.Member;
import mine.is.gpu.account.domain.MemberType;
import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.job.exception.JobException;
import mine.is.gpu.lab.domain.Lab;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class JobTest {
    private GpuBoard gpuBoard;
    private Member member;

    @BeforeEach
    void setUp() {
        Lab lab = new Lab("랩1");
        GpuServer gpuServer = new GpuServer("GPU서버1", false, 1024L, 1024L, lab);
        gpuBoard = new GpuBoard(false, 1000L, "모델1", gpuServer);
        member = new Member("user", "1234", "userName", MemberType.MANAGER, lab);
    }

    @DisplayName("생성 테스트 - 정상")
    @Test
    void 생성() {
        assertThatCode(() -> new Job("잡1", JobStatus.WAITING, gpuBoard, member, "metaData", "10"))
                .doesNotThrowAnyException();
    }

    @DisplayName("생성 테스트 - 이름이 null")
    @Test
    void 생성_이름_null() {
        assertThatThrownBy(() -> new Job(null, JobStatus.WAITING, gpuBoard, member, "metaData", "10"))
                .isEqualTo(JobException.INVALID_JOB_NAME.getException());
    }

    @DisplayName("생성 테스트 - 이름이 빈문자열")
    @Test
    void 생성_이름_빈문자열() {
        assertThatThrownBy(() -> new Job("", JobStatus.WAITING, gpuBoard, member, "metaData", "10"))
                .isEqualTo(JobException.INVALID_JOB_NAME.getException());
    }

    @DisplayName("생성 테스트 - JobStatus가 null")
    @Test
    void 생성_JobStatus_null() {
        assertThatThrownBy(() -> new Job("잡1", null, gpuBoard, member, "metaData", "10"))
                .isEqualTo(JobException.INVALID_JOB_STATUS.getException());
    }

    @DisplayName("생성 테스트 - GpuBoard가 null")
    @Test
    void 생성_GpuBoard_null() {
        assertThatThrownBy(() -> new Job("잡1", JobStatus.WAITING, null, member, "metaData", "10"))
                .isEqualTo(JobException.INVALID_GPU_BOARD.getException());
    }

    @DisplayName("생성 테스트 - Member가 null")
    @Test
    void 생성_Member_null() {
        assertThatThrownBy(() -> new Job("잡1", JobStatus.WAITING, gpuBoard, null, "metaData", "10"))
                .isEqualTo(JobException.INVALID_MEMBER.getException());
    }

    @DisplayName("생성 테스트 - metaData가 null")
    @Test
    void 생성_metaData_null() {
        assertThatThrownBy(() -> new Job("잡1", JobStatus.WAITING, gpuBoard, member, null, "10"))
                .isEqualTo(JobException.INVALID_META_DATA.getException());
    }

    @DisplayName("생성 테스트 - metaData가 빈문자열")
    @Test
    void 생성_metaData_빈문자열() {
        assertThatThrownBy(() -> new Job("잡1", JobStatus.WAITING, gpuBoard, member, "", "10"))
                .isEqualTo(JobException.INVALID_META_DATA.getException());
    }

    @DisplayName("생성 테스트 - expectedTime이 null")
    @Test
    void 생성_expectedTime_null() {
        assertThatThrownBy(() -> new Job("잡1", JobStatus.WAITING, gpuBoard, member, "metaData", null))
                .isEqualTo(JobException.INVALID_EXPECTED_TIME.getException());
    }

    @DisplayName("생성 테스트 - expectedTime이 빈문자열")
    @Test
    void 생성_expectedTime_빈문자열() {
        assertThatThrownBy(() -> new Job("잡1", JobStatus.WAITING, gpuBoard, member, "metaData", ""))
                .isEqualTo(JobException.INVALID_EXPECTED_TIME.getException());
    }

    @DisplayName("Job 정상 실행")
    @Test
    void startJob() {
        Job job = new Job("잡1", JobStatus.WAITING, gpuBoard, member, "metaData", "333");
        job.start();

        assertThat(job.getStartedTime()).isNotNull();
        assertThat(job.getStatus()).isEqualTo(JobStatus.RUNNING);
    }

    @DisplayName("Job 실행 실패")
    @ParameterizedTest(name = "{displayName} [status={arguments}] ")
    @ValueSource(strings = {"RUNNING", "CANCELED", "COMPLETED", "FAILED"})
    void startJobFailure(String status) {
        Job job = new Job("잡1", JobStatus.ignoreCaseValueOf(status), gpuBoard, member, "metaData", "333");

        assertThatThrownBy(job::start).isEqualTo(JobException.JOB_NOT_WAITING.getException());
    }

    @DisplayName("Job 정상 완료")
    @Test
    void completeJob() {
        Job job = new Job("잡1", JobStatus.RUNNING, gpuBoard, member, "metaData", "333");
        job.complete();

        assertThat(job.getEndedTime()).isNotNull();
        assertThat(job.getStatus()).isEqualTo(JobStatus.COMPLETED);
    }

    @DisplayName("Job 완료 실패")
    @ParameterizedTest(name = "{displayName} [status={arguments}] ")
    @ValueSource(strings = {"WAITING", "CANCELED", "COMPLETED", "FAILED"})
    void completeJobFailure(String status) {
        Job job = new Job("잡1", JobStatus.ignoreCaseValueOf(status), gpuBoard, member, "metaData", "333");

        assertThatThrownBy(job::complete).isEqualTo(JobException.JOB_NOT_RUNNING.getException());
    }

    @DisplayName("Job 정상 실패")
    @Test
    void failJob() {
        Job job = new Job("잡1", JobStatus.RUNNING, gpuBoard, member, "metaData", "333");
        job.fail();

        assertThat(job.getEndedTime()).isNotNull();
        assertThat(job.getStatus()).isEqualTo(JobStatus.FAILED);
    }

    @DisplayName("Job 완료 실패")
    @ParameterizedTest(name = "{displayName} [status={arguments}] ")
    @ValueSource(strings = {"WAITING", "CANCELED", "COMPLETED", "FAILED"})
    void failJobFailure(String status) {
        Job job = new Job("잡1", JobStatus.ignoreCaseValueOf(status), gpuBoard, member, "metaData", "333");

        assertThatThrownBy(job::fail).isEqualTo(JobException.JOB_NOT_RUNNING.getException());
    }

    @DisplayName("Job 예상 시간 검증 - 실패 케이스")
    @ParameterizedTest(name = "{displayName} [status={arguments}] ")
    @ValueSource(strings = {"-1", "0.5", "abc"})
    void expectedTimeFailure(String expectedTime) {
        assertThatThrownBy(() -> new Job("잡1", JobStatus.WAITING, gpuBoard, member, "metaData", expectedTime))
                .isEqualTo(JobException.INVALID_EXPECTED_TIME.getException());
    }

    @DisplayName("Job 예상 시간 검증 - 성공 케이스")
    @ParameterizedTest(name = "{displayName} [status={arguments}] ")
    @ValueSource(strings = {"0", "1", "700"})
    void expectedTimeSuccess(String expectedTime) {
        assertThatCode(() -> new Job("잡1", JobStatus.WAITING, gpuBoard, member, "metaData", expectedTime))
                .doesNotThrowAnyException();
    }
}
