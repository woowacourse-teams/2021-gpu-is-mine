package mine.is.gpu.mail;

import mine.is.gpu.infra.MailDto;
import mine.is.gpu.infra.MailService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@SpringBootTest
class MailServiceTest {
    @Autowired
    private MailService mailService;

    @DisplayName("메일 보내기")
    @Test
    void mailTest() {
        mailService.sendJobEndMail(new MailDto("gpuismine@gmail.com", "내가만든잡"));
    }
}
