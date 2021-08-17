package mine.is.gpu.gpuserver.exception;

import mine.is.gpu.exception.http.BadRequestException;
import mine.is.gpu.exception.http.CustomException;

public enum DeleteHistoryException {

    INVALID_GPU_SERVER_ID(new BadRequestException("DeleteHistory의 GpuServer 정보는 Null일 수 없습니다."));

    private CustomException customException;

    DeleteHistoryException(CustomException e) {
        this.customException = e;
    }

    public CustomException getException() {
        return customException;
    }
}
