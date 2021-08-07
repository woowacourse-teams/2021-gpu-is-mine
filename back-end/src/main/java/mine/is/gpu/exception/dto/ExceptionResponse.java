package mine.is.gpu.exception.dto;

public class ExceptionResponse {
    private String message;

    public ExceptionResponse() {
    }

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
