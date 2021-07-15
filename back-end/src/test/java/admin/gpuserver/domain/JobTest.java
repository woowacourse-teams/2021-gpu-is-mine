package admin.gpuserver.domain;

import admin.gpuserver.exception.JobException;
import admin.lab.domain.Lab;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class JobTest {
    private GpuBoard gpuBoard;
    private LabUser labUser;

    @BeforeEach
    void setUp() {
        Lab lab = new Lab("랩1");
        GpuServer gpuServer = new GpuServer("GPU서버1", false, 1024L, 1024L, lab);
        gpuBoard = new GpuBoard(false, 1000L, "모델1", gpuServer);
        labUser = new LabUser("유저1", UserType.MANAGER, lab);
    }

    @DisplayName("생성 테스트 - 정상")
    @Test
    void 생성() {
        assertThatCode(() -> new Job("잡1", JobStatus.WAITING, gpuBoard, labUser))
                .doesNotThrowAnyException();
    }

    @DisplayName("생성 테스트 - 이름이 null")
    @Test
    void 생성_이름_null() {
        assertThatThrownBy(() -> new Job(null, JobStatus.WAITING, gpuBoard, labUser))
                .isInstanceOf(JobException.class)
                .hasMessage("적절한 Job 이름이 아닙니다.");
    }

    @DisplayName("생성 테스트 - 이름이 빈문자열")
    @Test
    void 생성_이름_빈문자열() {
        assertThatThrownBy(() -> new Job("", JobStatus.WAITING, gpuBoard, labUser))
                .isInstanceOf(JobException.class)
                .hasMessage("적절한 Job 이름이 아닙니다.");
    }

    @DisplayName("생성 테스트 - JobStatus가 null")
    @Test
    void 생성_JobStatus_null() {
        assertThatThrownBy(() -> new Job("잡1", null, gpuBoard, labUser))
                .isInstanceOf(JobException.class)
                .hasMessage("Job 상태는 Null일 수 없습니다.");
    }

    @DisplayName("생성 테스트 - GpuBoard가 null")
    @Test
    void 생성_GpuBoard_null() {
        assertThatThrownBy(() -> new Job("잡1", JobStatus.WAITING, null, labUser))
                .isInstanceOf(JobException.class)
                .hasMessage("Job의 gpuBoard는 Null일 수 없습니다.");
    }

    @DisplayName("생성 테스트 - LabUser가 null")
    @Test
    void 생성_LabUser_null() {
        assertThatThrownBy(() -> new Job("잡1", JobStatus.WAITING, gpuBoard, null))
                .isInstanceOf(JobException.class)
                .hasMessage("Job의 LabUser는 Null일 수 없습니다.");
    }
}
