package admin.member.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import admin.member.exception.MemberException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class MemberTypeTest {
    @ParameterizedTest
    @ValueSource(strings = {"manager", "Manager", "mAnager", "MANAGER"})
    void managerTest(String input) {
        MemberType memberType = MemberType.ignoreCaseValueOf(input);
        assertThat(memberType).isEqualTo(MemberType.MANAGER);
    }

    @ParameterizedTest
    @ValueSource(strings = {"user", "User", "USER"})
    void userTest(String input) {
        MemberType memberType = MemberType.ignoreCaseValueOf(input);
        assertThat(memberType).isEqualTo(MemberType.USER);
    }

    @Test
    @DisplayName("존재하지 않는 타입 검색시 에러 발생")
    void notExistingTypeTest() {
        assertThatThrownBy(() -> MemberType.ignoreCaseValueOf("notMemberType"))
                .isEqualTo(MemberException.INVALID_MEMBER_TYPE.getException());
    }
}
