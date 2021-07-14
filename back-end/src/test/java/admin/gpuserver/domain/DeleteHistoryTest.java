package admin.gpuserver.domain;

import admin.gpuserver.exception.GpuServerServiceException;
import admin.lab.domain.Lab;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

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
                .isInstanceOf(GpuServerServiceException.class)
                .hasMessage("객체를 생성할 수 없습니다.");
    }
}
