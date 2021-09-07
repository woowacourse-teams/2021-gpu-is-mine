package mine.is.gpu.utils.encrypt;

import mine.is.gpu.exception.http.CustomException;
import mine.is.gpu.exception.http.NotFoundException;

public enum EncryptException {
    HASH_ALGORITHM_NOT_FOUND(new NotFoundException("암호화 해시 알고리즘이 없습니다."));

    private final CustomException customException;

    EncryptException(CustomException e) {
        this.customException = e;
    }

    public CustomException getException() {
        return customException;
    }
}
