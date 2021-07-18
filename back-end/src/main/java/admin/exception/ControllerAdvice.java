package admin.exception;

import admin.exception.dto.ExceptionResponse;
import admin.exception.http.BadRequestException;
import admin.exception.http.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ControllerAdvice {

    private static Logger logger = LoggerFactory.getLogger(ControllerAdvice.class);

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ExceptionResponse> badRequestHandle(BadRequestException exception) {
        ExceptionResponse response = ExceptionResponse.of(exception.getMessage());
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ExceptionResponse> notFoundHandle(NotFoundException exception) {
        ExceptionResponse response = ExceptionResponse.of(exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> globalHandle(Exception exception) {
        logger.error("Unhandled Exception", exception);

        ExceptionResponse response = ExceptionResponse.of(exception.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
