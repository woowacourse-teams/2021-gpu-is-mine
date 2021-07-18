package admin.member.exception;

import admin.exception.BadRequestException;
import admin.exception.CustomException;
import admin.exception.NotFoundException;

public enum MemberException {
    MEMBER_NOT_FOUND(new NotFoundException("해당 id의 회원이 존재하지 않습니다.")),
    INVALID_MEMBER_TYPE(new BadRequestException("존재하지 않는 MemberType 입니다."));

    private CustomException customException;

    MemberException(CustomException e) {
        this.customException = e;
    }

    public CustomException getException() {
        return customException;
    }

}
