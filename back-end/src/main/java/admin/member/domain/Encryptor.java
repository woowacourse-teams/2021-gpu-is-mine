package admin.member.domain;

import admin.member.exception.MemberException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;

@PropertySource(value = {"classpath:application-encryption.properties"})
public class Encryptor {
    private static final String HEX = "%02x";

    @Value("${encryption.hash.algorithm}")
    private String hashAlgorithm;

    @Value("${encryption.key.stretching}")
    private int keyStretching;

    private String password;
    private final String salt;

    public Encryptor(String password, String salt) {
        this.password = password;
        this.salt = salt;
    }

    public String hashedPassword() {
        try {
            MessageDigest md = MessageDigest.getInstance(hashAlgorithm);

            for (int i = 0; i < keyStretching; i++) {
                String combination = password + salt;
                md.update(combination.getBytes(StandardCharsets.UTF_8));
                password = convertByteToString(md.digest());
            }
        } catch (NoSuchAlgorithmException e) {
            throw MemberException.HASH_ALGORITHM_NOT_FOUND.getException();
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
