package admin.member.domain;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;

class MemberTypeTest{
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
}
