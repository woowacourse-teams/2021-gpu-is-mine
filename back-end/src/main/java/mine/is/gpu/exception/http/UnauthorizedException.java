package mine.is.gpu.exception.http;

import org.springframework.http.HttpStatus;

public class UnauthorizedException extends CustomException {

    public UnauthorizedException(String message) {
        super(message);
    }

    @Override
    public HttpStatus statusCode() {
        return HttpStatus.UNAUTHORIZED;
    }
}
