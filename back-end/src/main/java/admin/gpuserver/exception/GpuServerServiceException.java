package admin.gpuserver.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class GpuServerServiceException extends RuntimeException {

    public GpuServerServiceException(String message) {
        super(message);
    }
}
