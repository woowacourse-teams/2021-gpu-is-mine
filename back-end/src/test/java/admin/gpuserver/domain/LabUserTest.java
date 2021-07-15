package admin.gpuserver.domain;

import admin.gpuserver.exception.GpuServerServiceException;
import admin.lab.domain.Lab;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class LabUserTest {
    private Lab lab;

    @BeforeEach
    void setUp() {
        lab = new Lab("랩1");
    }

    @DisplayName("생성 테스트 - 정상")
    @Test
    void 생성() {
        assertThatCode(() -> new LabUser("유저1", UserType.MANAGER, lab))
                .doesNotThrowAnyException();
    }

    @DisplayName("생성 테스트 - 이름이 null")
    @Test
    void 생성_이름_null() {
        assertThatThrownBy(() -> new LabUser(null, UserType.MANAGER, lab))
                .isInstanceOf(GpuServerServiceException.class);
    }

    @DisplayName("생성 테스트 - 이름이 빈문자열")
    @Test
    void 생성_이름_빈문자열() {
        assertThatThrownBy(() -> new LabUser("", UserType.MANAGER, lab))
                .isInstanceOf(GpuServerServiceException.class);
    }

    @DisplayName("생성 테스트 - UserType이 null")
    @Test
    void 생성_UserType_null() {
        assertThatThrownBy(() -> new LabUser("유저1", null, lab))
                .isInstanceOf(GpuServerServiceException.class);
    }

    @DisplayName("생성 테스트 - Lab이 null")
    @Test
    void 생성_Lab_null() {
        assertThatThrownBy(() -> new LabUser("유저1", UserType.MEMBER, null))
                .isInstanceOf(GpuServerServiceException.class);
    }
}
