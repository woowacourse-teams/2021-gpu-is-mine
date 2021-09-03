package mine.is.gpu.auth.dto;

public class LoginResponse {

    private String accessToken;
    private Long expires;

    public LoginResponse() {
    }

    public LoginResponse(String accessToken, Long expires) {
        this.accessToken = accessToken;
        this.expires = expires;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public Long getExpires() {
        return expires;
    }
}
