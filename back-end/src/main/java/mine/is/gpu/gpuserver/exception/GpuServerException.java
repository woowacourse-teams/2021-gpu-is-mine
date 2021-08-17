package mine.is.gpu.gpuserver.exception;

import mine.is.gpu.exception.http.BadRequestException;
import mine.is.gpu.exception.http.CustomException;
import mine.is.gpu.exception.http.NotFoundException;

public enum GpuServerException {

    GPU_SERVER_NOT_FOUND(new NotFoundException("해당 id의 GPU 서버가 존재하지 않습니다.")),
    INVALID_NAME(new BadRequestException("적절한 GpuServer 이름이 아닙니다.")),
    INVALID_STATUS(new BadRequestException("GpuServer의 상태는 Null일 수 없습니다.")),
    INVALID_GPU_INFO(new BadRequestException("유효하지 않은 GpuServer 정보입니다.")),
    INVALID_LAB_ID(new BadRequestException("GpuServer의 Lab 정보는 Null일 수 없습니다.")),
    UNMATCHED_SERVER_WITH_LAB(new BadRequestException("GpuServer가 해당 Lab의 자원이 아닙니다.")),
    DUPLICATE_NAME_EXCEPTION(new BadRequestException("이미 존재하는 GpuServer 이름입니다."));

    private CustomException customException;

    GpuServerException(CustomException e) {
        this.customException = e;
    }

    public CustomException getException() {
        return customException;
    }
}
