package mine.is.gpu.mail;

import mine.is.gpu.infra.MailService;
import mine.is.gpu.infra.SendableJobData;
import mine.is.gpu.job.domain.JobStatus;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@Disabled
@ActiveProfiles("test")
@SpringBootTest
class MailServiceTest {
    @Autowired
    private MailService mailService;

    @DisplayName("메일 보내기")
    @Test
    void mailTest() {
        mailService.sendJobMail("email@email.com", JobStatus.WAITING, new SendableJobData(1L, "잡 이름 샘플"));
    }
}
