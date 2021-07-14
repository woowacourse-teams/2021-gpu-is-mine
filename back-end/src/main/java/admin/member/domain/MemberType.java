package admin.member.domain;

import admin.member.exception.MemberTypeException;

import java.util.Locale;

public enum MemberType {
    MANAGER, USER;

    public static MemberType ignoreCaseValueOf(String input) {
        try {
            return MemberType.valueOf(input.toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException e) {
            throw new MemberTypeException("존재하지 않는 MemberType 입니다.");
        }
    }
}
