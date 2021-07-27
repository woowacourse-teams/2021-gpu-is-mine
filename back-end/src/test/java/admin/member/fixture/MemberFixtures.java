package admin.member.fixture;

import admin.member.domain.MemberType;
import admin.member.dto.request.MemberRequest;

public class MemberFixtures {

    public static final String USER_EMAIL = "email@email.com";
    public static final String MANAGER_EMAIL = "manager@email.com";
    public static final String PASSWORD = "password";
    public static final String NAME = "name";
    public static final MemberType MANAGER = MemberType.MANAGER;
    public static final MemberType USER = MemberType.USER;

    public static MemberRequest userCreationRequest(Long labId) {
        return new MemberRequest(USER_EMAIL, PASSWORD, NAME, USER.name(), labId);
    }

    public static MemberRequest userCreationRequest(Long labId, String email, String password) {
        return new MemberRequest(email, password, NAME, USER.name(), labId);
    }

    public static MemberRequest managerCreationRequest(Long labId) {
        return new MemberRequest(MANAGER_EMAIL, PASSWORD, NAME, MANAGER.name(), labId);
    }

    public static MemberRequest managerCreationRequest(Long labId, String email, String password) {
        return new MemberRequest(MANAGER_EMAIL, PASSWORD, NAME, MANAGER.name(), labId);
    }

    public static MemberRequest memberCreationRequest(MemberType memberType, Long labId) {
        return new MemberRequest(USER_EMAIL, PASSWORD, NAME, memberType.name(), labId);
    }
}
