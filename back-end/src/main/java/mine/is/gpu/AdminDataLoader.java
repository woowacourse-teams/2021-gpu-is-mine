package mine.is.gpu;

import mine.is.gpu.admin.Administrator;
import mine.is.gpu.admin.AdministratorRepository;
import mine.is.gpu.encryption.Encrypt;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Profile("test")
@Component
public class AdminDataLoader implements CommandLineRunner {
    private final AdministratorRepository administratorRepository;
    private final Encrypt encrypt;

    public static final String ADMIN_EMAIL = "admin@email.com";
    public static final String ADMIN_PASSWORD = "password";

    public AdminDataLoader(AdministratorRepository administratorRepository, Encrypt encrypt) {
        this.administratorRepository = administratorRepository;
        this.encrypt = encrypt;
    }

    @Override
    public void run(String... args) {
        final String password = encrypt.hashedPassword(ADMIN_PASSWORD, ADMIN_EMAIL);
        Administrator administrator = new Administrator(ADMIN_EMAIL, password);
        administratorRepository.save(administrator);
    }
}
