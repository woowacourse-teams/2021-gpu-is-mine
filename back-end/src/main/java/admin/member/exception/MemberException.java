package admin.member.exception;

import admin.exception.http.BadRequestException;
import admin.exception.http.CustomException;
import admin.exception.http.NotFoundException;
import admin.exception.http.UnauthorizedException;

public enum MemberException {

    HASH_ALGORITHM_NOT_FOUND(new NotFoundException("암호화 해시 알고리즘이 없습니다.")),

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
