package admin.job.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import admin.job.exception.JobException;
import admin.lab.domain.Lab;
import admin.member.domain.Member;
import admin.member.domain.MemberType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class JobTest {
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
        assertThatCode(() -> new Job("잡1", JobStatus.WAITING, gpuBoard, member))
                .doesNotThrowAnyException();
    }

    @DisplayName("생성 테스트 - 이름이 null")
    @Test
    void 생성_이름_null() {
        assertThatThrownBy(() -> new Job(null, JobStatus.WAITING, gpuBoard, member))
                .isEqualTo(JobException.INVALID_JOB_NAME.getException());
    }

    @DisplayName("생성 테스트 - 이름이 빈문자열")
    @Test
    void 생성_이름_빈문자열() {
        assertThatThrownBy(() -> new Job("", JobStatus.WAITING, gpuBoard, member))
                .isEqualTo(JobException.INVALID_JOB_NAME.getException());
    }

    @DisplayName("생성 테스트 - JobStatus가 null")
    @Test
    void 생성_JobStatus_null() {
        assertThatThrownBy(() -> new Job("잡1", null, gpuBoard, member))
                .isEqualTo(JobException.INVALID_STATUS.getException());
    }

    @DisplayName("생성 테스트 - GpuBoard가 null")
    @Test
    void 생성_GpuBoard_null() {
        assertThatThrownBy(() -> new Job("잡1", JobStatus.WAITING, null, member))
                .isEqualTo(JobException.INVALID_GPU_BOARD.getException());
    }

    @DisplayName("생성 테스트 - Member가 null")
    @Test
    void 생성_Member_null() {
        assertThatThrownBy(() -> new Job("잡1", JobStatus.WAITING, gpuBoard, null))
                .isEqualTo(JobException.INVALID_MEMBER.getException());
    }
}
