package admin.member.fixture;

import admin.member.domain.MemberType;
import admin.member.dto.request.MemberRequest;

public class MemberFixtures {

    private static final String EMAIL = "email@email.com";
    private static final String PASSWORD = "password";
    private static final String NAME = "name";
    private static final MemberType MANAGER = MemberType.MANAGER;
    private static final MemberType USER = MemberType.USER;

    public static MemberRequest userCreationRequest(Long labId) {
        return new MemberRequest(EMAIL, PASSWORD, NAME, USER.name(), labId);
    }

    public static MemberRequest managerCreationRequest(Long labId) {
        return new MemberRequest(EMAIL, PASSWORD, NAME, MANAGER.name(), labId);
    }

    public static MemberRequest memberCreationRequest(MemberType memberType, Long labId) {
        return new MemberRequest(EMAIL, PASSWORD, NAME, memberType.name(), labId);
    }
}
