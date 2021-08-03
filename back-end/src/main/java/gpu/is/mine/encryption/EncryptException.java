package gpu.is.mine.encryption;

import gpu.is.mine.exception.http.CustomException;
import gpu.is.mine.exception.http.NotFoundException;

public enum EncryptException {
    HASH_ALGORITHM_NOT_FOUND(new NotFoundException("암호화 해시 알고리즘이 없습니다."));

    private CustomException customException;

    EncryptException(CustomException e) {
        this.customException = e;
    }

    public CustomException getException() {
        return customException;
    }
}
