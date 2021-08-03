package gpu.is.mine.gpuserver.exception;

import gpu.is.mine.exception.http.BadRequestException;
import gpu.is.mine.exception.http.CustomException;

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
