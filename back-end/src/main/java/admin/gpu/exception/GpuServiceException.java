package admin.gpu.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class GpuServiceException extends RuntimeException {
    public GpuServiceException(String message) {
        super(message);
    }
}
