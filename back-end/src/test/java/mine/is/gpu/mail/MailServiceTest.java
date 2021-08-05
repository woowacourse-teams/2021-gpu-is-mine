package mine.is.gpu.mail;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class MailServiceTest {

    @Autowired
    private MailService mailService;

    @DisplayName("메일 보내기")
    @Test
    @Disabled
    void mailTest() {
        mailService.sendJobStartMail(new MailDto("email@email.com", "test"));
    }
}
