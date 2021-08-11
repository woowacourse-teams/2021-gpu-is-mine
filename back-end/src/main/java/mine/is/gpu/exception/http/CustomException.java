package mine.is.gpu.exception.http;

import org.springframework.http.HttpStatus;

public abstract class CustomException extends RuntimeException {

    protected CustomException(String message) {
        super(message);
    }

    public abstract HttpStatus statusCode();
}
