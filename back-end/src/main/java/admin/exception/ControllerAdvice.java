package admin.exception;

import admin.exception.dto.ExceptionResponse;
import admin.exception.http.CustomException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerAdvice {

    private static final Logger logger = LoggerFactory.getLogger(ControllerAdvice.class);

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ExceptionResponse> customHandle(CustomException exception) {
        ExceptionResponse response = ExceptionResponse.of(exception.getMessage());
        return ResponseEntity.status(exception.statusCode()).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> methodValidHandle(MethodArgumentNotValidException exception) {
        FieldError fieldError = exception.getBindingResult().getFieldError();

        ExceptionResponse response = ExceptionResponse.of(fieldError.getDefaultMessage());

        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> globalHandle(Exception exception) {
        logger.error("Unhandled Exception", exception);

        ExceptionResponse response = ExceptionResponse.of(exception.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
