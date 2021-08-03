package mine.is.gpu.member.dto.request;

public class MemberTypeRequest {
    private String memberType;

    public MemberTypeRequest() {
    }

    public MemberTypeRequest(String memberType) {
        this.memberType = memberType;
    }

    public String getMemberType() {
        return memberType;
    }
}
