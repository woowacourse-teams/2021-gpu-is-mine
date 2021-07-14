package admin.gpuserver.domain;

import admin.gpuserver.exception.GpuServerServiceException;
import admin.lab.domain.Lab;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class LabTest {
    @DisplayName("생성 테스트 - 정상")
    @Test
    void 생성() {
        assertThatCode(() -> new Lab("랩1"))
                .doesNotThrowAnyException();
    }

    @DisplayName("생성 테스트 - 이름이 null")
    @Test
    void 생성_이름_null() {
        assertThatThrownBy(() -> new Lab(null))
                .isInstanceOf(GpuServerServiceException.class)
                .hasMessage("객체를 생성할 수 없습니다.");
    }

    @DisplayName("생성 테스트 - 이름이 빈문자열")
    @Test
    void 생성_이름_빈문자열() {
        assertThatThrownBy(() -> new Lab(""))
                .isInstanceOf(GpuServerServiceException.class)
                .hasMessage("객체를 생성할 수 없습니다.");
    }
}
