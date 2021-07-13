package admin.member.dto;

import javax.validation.constraints.Email;

public class MemberRequest {
    @Email
    private String email;
    private String password;
    private String name;
    private String memberType;
    private Long labId;

    public MemberRequest() {
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public String getMemberType() {
        return memberType;
    }

    public Long getLabId() {
        return labId;
    }
}
