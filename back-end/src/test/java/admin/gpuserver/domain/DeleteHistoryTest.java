package admin.gpuserver.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import admin.gpuserver.exception.DeleteHistoryException;
import admin.lab.domain.Lab;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class DeleteHistoryTest {
    private GpuServer gpuServer;

    @BeforeEach
    void setUp() {
        Lab lab = new Lab("랩1");
        gpuServer = new GpuServer("GPU서버1", false, 1024L, 1024L, lab);
    }

    @DisplayName("생성 테스트 - 정상")
    @Test
    void 생성() {
        assertThatCode(() -> new DeleteHistory(gpuServer))
                .doesNotThrowAnyException();
    }

    @DisplayName("생성 테스트 - GpuServer가 null")
    @Test
    void 생성_GpuServer_null() {
        assertThatThrownBy(() -> new DeleteHistory(null))
                .isEqualTo(DeleteHistoryException.INVALID_GPU_SERVER_ID.getException());
    }
}
