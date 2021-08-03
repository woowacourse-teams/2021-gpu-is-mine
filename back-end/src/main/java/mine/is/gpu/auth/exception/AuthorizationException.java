package mine.is.gpu.auth.exception;

import mine.is.gpu.exception.http.CustomException;
import mine.is.gpu.exception.http.UnauthorizedException;

public enum AuthorizationException {
    NOT_EXISTING_EMAIL(new UnauthorizedException("존재하지 않는 이메일입니다.")),
    NOT_CORRECT_PASSWORD(new UnauthorizedException("패스워드가 일치하지 않습니다.")),
    INVALID_TOKEN(new UnauthorizedException("유효하지 않은 토큰 정보입니다.")),
    UNAUTHORIZED_USER(new UnauthorizedException("접근 권한이 없는 사용자 입니다."));

    private CustomException exception;

    AuthorizationException(CustomException exception) {
        this.exception = exception;
    }

    public CustomException getException() {
        return exception;
    }
}
