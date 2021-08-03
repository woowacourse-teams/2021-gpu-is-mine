package gpu.is.mine.exception.http;

import org.springframework.http.HttpStatus;

public abstract class CustomException extends RuntimeException {

    public CustomException(String message) {
        super(message);
    }

    public abstract HttpStatus statusCode();
}
