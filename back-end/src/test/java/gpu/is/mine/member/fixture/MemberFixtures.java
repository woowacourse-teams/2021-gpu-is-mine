package gpu.is.mine.member.fixture;

import gpu.is.mine.member.domain.MemberType;
import gpu.is.mine.member.dto.request.MemberRequest;

public class MemberFixtures {

    private static final String USER_EMAIL = "email@email.com";
    private static final String MANAGER_EMAIL = "manager@email.com";
    private static final String PASSWORD = "password";
    private static final String NAME = "name";
    private static final MemberType MANAGER = MemberType.MANAGER;
    private static final MemberType USER = MemberType.USER;

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
        return new MemberRequest(email, password, NAME, MANAGER.name(), labId);
    }

    public static MemberRequest memberCreationRequest(MemberType memberType, Long labId) {
        return new MemberRequest(USER_EMAIL, PASSWORD, NAME, memberType.name(), labId);
    }
}
