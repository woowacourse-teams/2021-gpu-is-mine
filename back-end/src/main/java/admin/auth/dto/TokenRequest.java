package admin.auth.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class TokenRequest {

    @Email(message = "잘못된 이메일 형식입니다.")
    @NotBlank(message = "이메일 빈칸일 수 없습니다.")
    private String email;

    @NotBlank(message = "패스워드는 빈 칸이 될 수 없습니다.")
    private String password;

    public TokenRequest() {
    }

    public TokenRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
