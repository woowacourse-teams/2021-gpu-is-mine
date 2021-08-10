package mine.is.gpu.member.domain;

import java.util.Locale;
import mine.is.gpu.member.exception.MemberException;

public enum MemberType {
    MANAGER, USER;

    public static MemberType ignoreCaseValueOf(String input) {
        try {
            return MemberType.valueOf(input.toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException e) {
            throw MemberException.INVALID_MEMBER_TYPE.getException();
        }
    }

    public boolean isManager() {
        return this.equals(MANAGER);
    }
}
