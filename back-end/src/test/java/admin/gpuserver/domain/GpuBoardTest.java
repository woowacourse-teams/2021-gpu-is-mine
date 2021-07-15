package admin.gpuserver.domain;

import admin.gpuserver.exception.GpuServerServiceException;
import admin.lab.domain.Lab;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

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
                .isInstanceOf(GpuServerServiceException.class);
    }

    @DisplayName("생성 테스트 - Performance가 null")
    @Test
    void 생성_Performance_null() {
        assertThatThrownBy(() -> new GpuBoard(false, null, "모델1", gpuServer))
                .isInstanceOf(GpuServerServiceException.class);
    }

    @DisplayName("생성 테스트 - Performance가 0이하")
    @ParameterizedTest
    @ValueSource(longs = {-1024, -1, 0})
    void 생성_Performance_0이하(Long input) {
        assertThatThrownBy(() -> new GpuBoard(false, input, "모델1", gpuServer))
                .isInstanceOf(GpuServerServiceException.class);
    }

    @DisplayName("생성 테스트 - 모델이름이 null")
    @Test
    void 생성_모델이름_null() {
        assertThatThrownBy(() -> new GpuBoard(false, 1000L, null, gpuServer))
                .isInstanceOf(GpuServerServiceException.class);
    }

    @DisplayName("생성 테스트 - 모델이름이 빈문자열")
    @Test
    void 생성_모델이름_빈문자열() {
        assertThatThrownBy(() -> new GpuBoard(false, 1000L, "", gpuServer))
                .isInstanceOf(GpuServerServiceException.class);
    }

    @DisplayName("생성 테스트 - GpuServer가 null")
    @Test
    void 생성_GpuServer_null() {
        assertThatThrownBy(() -> new GpuBoard(false, 1000L, "모델1", null))
                .isInstanceOf(GpuServerServiceException.class);
    }
}
