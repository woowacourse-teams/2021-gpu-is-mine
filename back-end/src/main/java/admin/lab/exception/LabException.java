package admin.lab.exception;

import admin.exception.http.BadRequestException;
import admin.exception.http.CustomException;
import admin.exception.http.NotFoundException;

public enum LabException {

    LAB_NOT_FOUND(new NotFoundException("해당 id의 Lab이 존재하지 않습니다.")),

    INVALID_LAB_NAME(new BadRequestException("적절한 Lab 이름이 아닙니다."));

    private CustomException customException;

    LabException(CustomException e) {
        this.customException = e;
    }

    public CustomException getException() {
        return customException;
    }
}
