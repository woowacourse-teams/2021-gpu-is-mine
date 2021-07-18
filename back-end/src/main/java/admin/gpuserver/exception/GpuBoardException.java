package admin.gpuserver.exception;

import admin.exception.http.BadRequestException;
import admin.exception.http.CustomException;
import admin.exception.http.NotFoundException;

public enum GpuBoardException {

    GPU_BOARD_NOT_FOUND(new NotFoundException("존재하지 않는 보드입니다.")),

    INVALID_PERFORMANCE(new BadRequestException("잘못된 GpuBoard 정보 입력입니다.")),
    INVALID_STATUS(new BadRequestException("GpuBoard 상태는 Null일 수 없습니다.")),
    INVALID_MODEL(new BadRequestException("적절하지 않은 GpuBoard 모델 정보입니다.")),
    INVALID_GPU_SERVER_ID(new BadRequestException("GpuBoard의 GpuServer 정보는 Null일 수 없습니다."));

    private CustomException customException;

    GpuBoardException(CustomException e) {
        this.customException = e;
    }

    public CustomException getException() {
        return customException;
    }
}
