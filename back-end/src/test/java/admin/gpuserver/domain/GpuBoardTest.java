package admin.gpuserver.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import admin.gpuserver.exception.GpuBoardException;
import admin.lab.domain.Lab;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

public class GpuBoardTest {
    private GpuServer gpuServer;

    @BeforeEach
    void setUp() {
        Lab lab = new Lab("랩1");
        gpuServer = new GpuServer("GPU서버1", false, 1024L, 1024L, lab);
    }

    @DisplayName("생성 테스트 - 정상")
    @Test
    void 생성() {
        assertThatCode(() -> new GpuBoard(false, 1000L, "모델1", gpuServer))
                .doesNotThrowAnyException();
    }

    @DisplayName("생성 테스트 - IsWorking이 null")
    @Test
    void 생성_IsWorking_null() {
        assertThatThrownBy(() -> new GpuBoard(null, 1000L, "모델1", gpuServer))
                .isEqualTo(GpuBoardException.INVALID_STATUS.getException());
    }

    @DisplayName("생성 테스트 - Performance가 null")
    @Test
    void 생성_Performance_null() {
        assertThatThrownBy(() -> new GpuBoard(false, null, "모델1", gpuServer))
                .isEqualTo(GpuBoardException.INVALID_PERFORMANCE.getException());
    }

    @DisplayName("생성 테스트 - Performance가 0이하")
    @ParameterizedTest
    @ValueSource(longs = {-1024, -1, 0})
    void 생성_Performance_0이하(Long input) {
        assertThatThrownBy(() -> new GpuBoard(false, input, "모델1", gpuServer))
                .isEqualTo(GpuBoardException.INVALID_PERFORMANCE.getException());
    }

    @DisplayName("생성 테스트 - 모델이름이 null")
    @Test
    void 생성_모델이름_null() {
        assertThatThrownBy(() -> new GpuBoard(false, 1000L, null, gpuServer))
                .isEqualTo(GpuBoardException.INVALID_MODEL.getException());
    }

    @DisplayName("생성 테스트 - 모델이름이 빈문자열")
    @Test
    void 생성_모델이름_빈문자열() {
        assertThatThrownBy(() -> new GpuBoard(false, 1000L, "", gpuServer))
                .isEqualTo(GpuBoardException.INVALID_MODEL.getException());
    }

    @DisplayName("생성 테스트 - GpuServer가 null")
    @Test
    void 생성_GpuServer_null() {
        assertThatThrownBy(() -> new GpuBoard(false, 1000L, "모델1", null))
                .isEqualTo(GpuBoardException.INVALID_GPU_SERVER_ID.getException());
    }
}
