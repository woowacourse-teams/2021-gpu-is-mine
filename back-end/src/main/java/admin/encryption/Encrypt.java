package admin.encryption;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Encrypt {
    private static final String HEX = "%02x";

    private final String hashAlgorithm;
    private final int keyStretching;

    public Encrypt(String hashAlgorithm, int keyStretching) {
        this.hashAlgorithm = hashAlgorithm;
        this.keyStretching = keyStretching;
    }

    public String hashedPassword(String password, String salt) {
        try {
            MessageDigest md = MessageDigest.getInstance(hashAlgorithm);

            for (int i = 0; i < keyStretching; i++) {
                String combination = password + salt;
                md.update(combination.getBytes(StandardCharsets.UTF_8));
                password = convertByteToString(md.digest());
            }
        } catch (NoSuchAlgorithmException e) {
            throw EncryptException.HASH_ALGORITHM_NOT_FOUND.getException();
        }

        return password;
    }

    private String convertByteToString(byte[] bytes) {
        StringBuilder sb = new StringBuilder();

        for (byte singleByte : bytes) {
            sb.append(String.format(HEX, singleByte));
        }

        return sb.toString();
    }
}
