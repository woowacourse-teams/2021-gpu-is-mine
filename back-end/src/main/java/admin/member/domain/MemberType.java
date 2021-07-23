package admin.member.domain;

import admin.member.exception.MemberException;
import java.util.Locale;

public enum MemberType {
    MANAGER, USER;

    public static MemberType ignoreCaseValueOf(String input) {
        try {
            return MemberType.valueOf(input.toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException e) {
            throw MemberException.INVALID_MEMBER_TYPE.getException();
        }
    }
}
