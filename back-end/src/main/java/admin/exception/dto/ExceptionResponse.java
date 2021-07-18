package admin.exception.dto;

public class ExceptionResponse {
    private final String message;

    private ExceptionResponse(String message) {
        this.message = message;
    }

    public static ExceptionResponse of(String message) {
        return new ExceptionResponse(message);
    }

    public String getMessage() {
        return message;
    }
}
