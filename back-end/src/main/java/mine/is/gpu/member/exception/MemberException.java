package mine.is.gpu.member.exception;

import mine.is.gpu.exception.http.BadRequestException;
import mine.is.gpu.exception.http.CustomException;
import mine.is.gpu.exception.http.NotFoundException;
import mine.is.gpu.exception.http.UnauthorizedException;

public enum MemberException {

    MEMBER_NOT_FOUND(new NotFoundException("해당 id의 회원이 존재하지 않습니다.")),

    INVALID_MEMBER_TYPE(new BadRequestException("존재하지 않는 MemberType 입니다.")),

    UNAUTHORIZED_MEMBER(new UnauthorizedException("접근 권한이 없는 회원입니다."));

    private CustomException customException;

    MemberException(CustomException e) {
        this.customException = e;
    }

    public CustomException getException() {
        return customException;
    }

}
