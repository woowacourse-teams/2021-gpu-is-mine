package admin.member.dto;

import admin.lab.domain.Lab;
import admin.lab.dto.LabResponse;
import admin.member.domain.Member;

public class MemberResponse {
    private Long id;
    private String email;
    private String name;
    private LabResponse labResponse;

    public MemberResponse(Long id, String email, String name, LabResponse labResponse) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.labResponse = labResponse;
    }

    public static MemberResponse of(Member member){
        LabResponse labResponse = LabResponse.of(member.getLab());
        return new MemberResponse(member.getId(), member.getEmail(), member.getName(), labResponse);
    }
}
