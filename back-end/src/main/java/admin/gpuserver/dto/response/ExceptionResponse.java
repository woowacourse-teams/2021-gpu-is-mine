package admin.gpuserver.dto.response;

public class ExceptionResponse {
    private final String message;

    public static ExceptionResponse of(Exception exception) {
        return new ExceptionResponse(exception.getMessage());
    }

    public ExceptionResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
