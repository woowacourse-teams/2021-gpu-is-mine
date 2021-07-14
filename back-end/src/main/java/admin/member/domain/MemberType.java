package admin.member.domain;

import java.util.Locale;

public enum MemberType {
    MANAGER, USER;

    public static MemberType ignoreCaseValueOf(String input) {
        return MemberType.valueOf(input.toUpperCase(Locale.ROOT));
    }
}
