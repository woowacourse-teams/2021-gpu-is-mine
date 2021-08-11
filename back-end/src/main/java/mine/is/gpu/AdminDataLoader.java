package mine.is.gpu;

import mine.is.gpu.admin.Administrator;
import mine.is.gpu.admin.AdministratorRepository;
import mine.is.gpu.encryption.Encrypt;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@PropertySource(value = {"classpath:application-db.properties"})
@Profile({"was1", "was2"})
@Component
public class AdminDataLoader implements CommandLineRunner {
    private final AdministratorRepository administratorRepository;
    private final Encrypt encrypt;

    @Value("${db.admin.email}")
    public String prodEmail;
    @Value("${db.admin.password}")
    public String prodPassword;

    public static final String ADMIN_EMAIL = "admin@email.com";
    public static final String ADMIN_PASSWORD = "password";

    public AdminDataLoader(AdministratorRepository administratorRepository, Encrypt encrypt) {
        this.administratorRepository = administratorRepository;
        this.encrypt = encrypt;
    }

    @Override
    public void run(String... args) {
        final String password = encrypt.hashedPassword(prodPassword, prodEmail);
        Administrator administrator = new Administrator(prodEmail, password);
        administratorRepository.save(administrator);
    }
}
