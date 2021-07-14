package admin.member.dto.request;

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

    public MemberRequest(String email, String password, String name, String memberType, Long labId) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.memberType = memberType;
        this.labId = labId;
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
