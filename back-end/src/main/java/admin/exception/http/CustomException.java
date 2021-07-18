package admin.exception.http;

public abstract class CustomException extends RuntimeException {

    public CustomException(String message) {
        super(message);
    }
}
