package admin.member.domain;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Encryptor {
    private static final String HASH_ALGORITHM = "SHA-256";
    private static final int KEY_STRECHING = 10000;
    private static final String HEX = "%02x";

    private String password;
    private final String salt;

    public Encryptor(String password, String salt) {
        this.password = password;
        this.salt = salt;
    }

    public String hashedPassword() {
        try {
            MessageDigest md = MessageDigest.getInstance(HASH_ALGORITHM);
            for (int i = 0; i < KEY_STRECHING; i++) {
                String combination = password + salt;
                md.update(combination.getBytes(StandardCharsets.UTF_8));
                password = convertByteToString(md.digest());
            }
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
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
