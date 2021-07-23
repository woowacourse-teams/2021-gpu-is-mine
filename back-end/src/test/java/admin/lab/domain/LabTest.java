package admin.lab.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import admin.lab.exception.LabException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

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
                .isEqualTo(LabException.INVALID_LAB_NAME.getException());
    }

    @DisplayName("생성 테스트 - 이름이 빈문자열")
    @Test
    void 생성_이름_빈문자열() {
        assertThatThrownBy(() -> new Lab(""))
                .isEqualTo(LabException.INVALID_LAB_NAME.getException());
    }
}
