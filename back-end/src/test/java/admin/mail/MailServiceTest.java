package admin.mail;

import admin.AcceptanceTest;
import jdk.nashorn.internal.ir.annotations.Ignore;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MailServiceTest {

    @Autowired
    private MailService mailService;

    @Test
    @Disabled
    void name() {
        mailService.sendMail("ktw9695@naver.com", "test", "test");
    }

}
