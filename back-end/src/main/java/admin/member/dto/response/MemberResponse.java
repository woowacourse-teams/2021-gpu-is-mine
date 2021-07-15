package admin.member.dto.response;

import admin.lab.dto.LabResponse;
import admin.member.domain.Member;
import admin.member.domain.MemberType;

public class MemberResponse {
    private Long id;
    private String email;
    private String name;
    private MemberType memberType;
    private LabResponse labResponse;

    private MemberResponse(Long id, String email, String name, MemberType memberType, LabResponse labResponse) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.memberType = memberType;
        this.labResponse = labResponse;
    }

    public static MemberResponse of(Member member) {
        LabResponse labResponse = LabResponse.of(member.getLab());
        return new MemberResponse(member.getId(), member.getEmail(), member.getName(), member
                .getMemberType(), labResponse);
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public MemberType getMemberType() {
        return memberType;
    }

    public LabResponse getLabResponse() {
        return labResponse;
    }
}
