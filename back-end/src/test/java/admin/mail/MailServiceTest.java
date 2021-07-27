package admin.mail;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MailServiceTest {

    @Autowired
    private MailService mailService;

    @Test
    @Disabled
    void name() {
        mailService.sendJobStartMail("email@email.com", "test");
    }
}
