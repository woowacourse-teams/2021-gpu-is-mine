package admin.lab.domain;

import admin.lab.exception.LabException;
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
                .isInstanceOf(LabException.class)
                .hasMessage("적절한 Lab 이름이 아닙니다.");
    }

    @DisplayName("생성 테스트 - 이름이 빈문자열")
    @Test
    void 생성_이름_빈문자열() {
        assertThatThrownBy(() -> new Lab(""))
                .isInstanceOf(LabException.class)
                .hasMessage("적절한 Lab 이름이 아닙니다.");
    }
}
