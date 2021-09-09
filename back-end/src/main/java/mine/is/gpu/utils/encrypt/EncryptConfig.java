package mine.is.gpu.utils.encrypt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource(value = {"classpath:application-encryption.properties"})
public class EncryptConfig {
    @Value("${encryption.hash.algorithm}")
    private String hashAlgorithm;

    @Value("${encryption.key.stretching}")
    private int keyStretching;

    @Bean
    public Encrypt encrypt() {
        return new Encrypt(hashAlgorithm, keyStretching);
    }
}
