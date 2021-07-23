package admin.gpuserver.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import admin.gpuserver.exception.GpuServerException;
import admin.lab.domain.Lab;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

public class GpuServerTest {
    private Lab lab;

    @BeforeEach
    void setUp() {
        lab = new Lab("랩1");
    }

    @DisplayName("생성 테스트 - 정상")
    @Test
    void 생성() {
        assertThatCode(() -> new GpuServer("GPU서버1", false, 1024L, 1024L, lab))
                .doesNotThrowAnyException();
    }

    @DisplayName("생성 테스트 - 이름이 null")
    @Test
    void 생성_이름_null() {
        assertThatThrownBy(() -> new GpuServer(null, false, 1024L, 1024L, lab))
                .isEqualTo(GpuServerException.INVALID_NAME.getException());
    }

    @DisplayName("생성 테스트 - 이름이 빈문자열")
    @Test
    void 생성_이름_빈문자열() {
        assertThatThrownBy(() -> new GpuServer("", false, 1024L, 1024L, lab))
                .isEqualTo(GpuServerException.INVALID_NAME.getException());
    }

    @DisplayName("생성 테스트 - IsOn이 null")
    @Test
    void 생성_IsOn_null() {
        assertThatThrownBy(() -> new GpuServer("GPU서버1", null, 1024L, 1024L, lab))
                .isEqualTo(GpuServerException.INVALID_STATUS.getException());
    }

    @DisplayName("생성 테스트 - MemorySize이 null")
    @Test
    void 생성_MemorySize_null() {
        assertThatThrownBy(() -> new GpuServer("GPU서버1", false, null, 1024L, lab))
                .isEqualTo(GpuServerException.INVALID_GPU_INFO.getException());
    }

    @DisplayName("생성 테스트 - MemorySize이 0이하")
    @ParameterizedTest
    @ValueSource(longs = {-1024, -1, 0})
    void 생성_MemorySize_0이하(Long input) {
        assertThatThrownBy(() -> new GpuServer("GPU서버1", false, input, 1024L, lab))
                .isEqualTo(GpuServerException.INVALID_GPU_INFO.getException());
    }

    @DisplayName("생성 테스트 - DiskSize이 null")
    @Test
    void 생성_DiskSize_null() {
        assertThatThrownBy(() -> new GpuServer("GPU서버1", false, 1024L, null, lab))
                .isEqualTo(GpuServerException.INVALID_GPU_INFO.getException());
    }

    @DisplayName("생성 테스트 - DiskSize이 0이하")
    @ParameterizedTest
    @ValueSource(longs = {-1024, -1, 0})
    void 생성_DiskSize_0이하(Long input) {
        assertThatThrownBy(() -> new GpuServer("GPU서버1", false, 1024L, input, lab))
                .isEqualTo(GpuServerException.INVALID_GPU_INFO.getException());
    }

    @DisplayName("생성 테스트 - Lab이 null")
    @Test
    void 생성_Lab_null() {
        assertThatThrownBy(() -> new GpuServer("GPU서버1", false, 1024L, 1024L, null))
                .isEqualTo(GpuServerException.INVALID_LAB_ID.getException());
    }
}
