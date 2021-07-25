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
        for (int i = 0; i < 3; i++) {
            mailService.sendMail("ktw9695@naver.com", "test", "test");
            System.out.println("[LOG]Mail Number= " + i);
        }
    }
}
