package admin.member.exception;

import admin.exception.http.BadRequestException;
import admin.exception.http.CustomException;
import admin.exception.http.NotFoundException;

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
