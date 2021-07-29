package admin.member.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class EncryptorTest {
    @DisplayName("같은 암호와 Salt로 해쉬된 암호가 동일한지 확인")
    @Test
    void samePasswordAndSalt() {
        String password = "password";
        String salt = "salt";

        Encryptor encryptor1 = new Encryptor(password, salt);
        String hashedPassword1 = encryptor1.hashedPassword();

        Encryptor encryptor2 = new Encryptor(password, salt);
        String hashedPassword2 = encryptor2.hashedPassword();

        assertEquals(hashedPassword1, hashedPassword2);
    }

    @DisplayName("동일한 암호와 다른 Salt로 해쉬된 암호가 다른지 확인")
    @Test
    void samePasswordAndDifferentSalt() {
        String password = "password";
        String salt1 = "salt1";
        String salt2 = "salt2";

        Encryptor encryptor1 = new Encryptor(password, salt1);
        String hashedPassword1 = encryptor1.hashedPassword();

        Encryptor encryptor2 = new Encryptor(password, salt2);
        String hashedPassword2 = encryptor2.hashedPassword();

        assertNotEquals(hashedPassword1, hashedPassword2);
    }

    @DisplayName("다른 암호와 동일한 Salt로 해쉬된 암호가 다른지 확인")
    @Test
    void differentPasswordAndSameSalt() {
        String password1 = "password1";
        String password2 = "password2";
        String salt = "salt";

        Encryptor encryptor1 = new Encryptor(password1, salt);
        String hashedPassword1 = encryptor1.hashedPassword();

        Encryptor encryptor2 = new Encryptor(password2, salt);
        String hashedPassword2 = encryptor2.hashedPassword();

        assertNotEquals(hashedPassword1, hashedPassword2);
    }
}
