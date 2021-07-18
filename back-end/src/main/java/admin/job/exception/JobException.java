package admin.job.exception;

import admin.exception.http.BadRequestException;
import admin.exception.http.CustomException;
import admin.exception.http.NotFoundException;

public enum JobException {

    JOB_NOT_FOUND(new NotFoundException("해당 id의 Job이 존재하지 않습니다.")),

    INVALID_JOB_NAME(new BadRequestException("적절한 Job 이름이 아닙니다.")),
    INVALID_STATUS(new BadRequestException("Job 상태는 Null일 수 없습니다.")),
    INVALID_GPU_BOARD(new BadRequestException("Job의 gpuBoard는 Null일 수 없습니다.")),
    INVALID_MEMBER(new BadRequestException("Job의 Member는 Null일 수 없습니다."));

    private CustomException customException;

    JobException(CustomException e) {
        this.customException = e;
    }

    public CustomException getException() {
        return customException;
    }
}
