package mine.is.gpu.member.dto.request;

public class MemberUpdateRequest {
    private String name;
    private String password;

    public MemberUpdateRequest() {
    }

    public MemberUpdateRequest(String name, String password) {
        this.name = name;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }
}
