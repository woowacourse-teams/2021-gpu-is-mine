package mine.is.gpu.member.dto.request;

public class MemberInfoRequest {
    private String name;
    private String password;

    public MemberInfoRequest() {
    }

    public MemberInfoRequest(String name, String password) {
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
