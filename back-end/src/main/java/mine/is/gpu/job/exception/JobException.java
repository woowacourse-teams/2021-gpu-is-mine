package mine.is.gpu.job.exception;

import mine.is.gpu.exception.http.BadRequestException;
import mine.is.gpu.exception.http.CustomException;
import mine.is.gpu.exception.http.NotFoundException;

public enum JobException {

    JOB_NOT_FOUND(new NotFoundException("해당 id의 Job이 존재하지 않습니다.")),
    NO_WAITING_JOB(new NotFoundException("대기중인 Job이 없습니다.")),

    JOB_NOT_WAITING(new BadRequestException("현재 대기 중이지 않은 Job이 완료될 수 없습니다.")),
    JOB_NOT_RUNNING(new BadRequestException("현재 진행 중이지 않은 Job이 완료될 수 없습니다.")),
    INVALID_JOB_NAME(new BadRequestException("적절한 Job 이름이 아닙니다.")),
    INVALID_GPU_BOARD(new BadRequestException("Job의 gpuBoard는 Null일 수 없습니다.")),
    INVALID_MEMBER(new BadRequestException("Job의 Member는 Null일 수 없습니다.")),
    INVALID_META_DATA(new BadRequestException("적절한 metaData가 아닙니다.")),
    INVALID_EXPECTED_TIME(new BadRequestException("적절한 expectedTime이 아닙니다.")),
    NOT_EXISTING_JOB_STATUS(new BadRequestException("존재하지 않는 Job Status 요청입니다.")),
    UNSUPPORTED_JOB_STATUS_UPDATE(new BadRequestException("해당 요청의 상태 수정 요청은 지원하지 않습니다."));

    private CustomException customException;

    JobException(CustomException e) {
        this.customException = e;
    }

    public CustomException getException() {
        return customException;
    }
}
