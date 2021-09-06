package utils.encryption;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import mine.is.gpu.utils.Encrypt;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class EncryptTest {
    @Autowired
    private Encrypt encrypt;

    @DisplayName("같은 암호와 Salt로 해쉬된 암호가 동일한지 확인")
    @Test
    void samePasswordAndSalt() {
        String password = "password";
        String salt = "salt";

        String hashedPassword1 = encrypt.hashedPassword(password, salt);
        String hashedPassword2 = encrypt.hashedPassword(password, salt);

        assertEquals(hashedPassword1, hashedPassword2);
    }

    @DisplayName("동일한 암호와 다른 Salt로 해쉬된 암호가 다른지 확인")
    @Test
    void samePasswordAndDifferentSalt() {
        String password = "password";
        String salt1 = "salt1";
        String salt2 = "salt2";

        String hashedPassword1 = encrypt.hashedPassword(password, salt1);
        String hashedPassword2 = encrypt.hashedPassword(password, salt2);

        assertNotEquals(hashedPassword1, hashedPassword2);
    }

    @DisplayName("다른 암호와 동일한 Salt로 해쉬된 암호가 다른지 확인")
    @Test
    void differentPasswordAndSameSalt() {
        String password1 = "password1";
        String password2 = "password2";
        String salt = "salt";

        String hashedPassword1 = encrypt.hashedPassword(password1, salt);
        String hashedPassword2 = encrypt.hashedPassword(password2, salt);

        assertNotEquals(hashedPassword1, hashedPassword2);
    }
}
