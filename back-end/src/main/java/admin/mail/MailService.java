package admin.mail;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

@Service
public class MailService {

    private static final String NOREPLY_GPUISMINE_COM = "noreply@gpuismine.com";
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    public MailService(JavaMailSender mailSender, SpringTemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    @Async("mailExecutor")
    public void sendJobStartMail(String to, String jobName) {
        Context context = new Context();
        context.setVariable("jobName", jobName);

        String subject = "[GPU-IS_MINE] Job 시작 알림 메일";
        String body = templateEngine.process("job-start.html", context);

        sendMail(to, subject, body);
    }

    @Async("mailExecutor")
    public void sendJobEndMail(String to, String jobName) {
        Context context = new Context();
        context.setVariable("jobName", jobName);

        String subject = "[GPU-IS_MINE] Job 종료 알림 메일";
        String body = templateEngine.process("job-end.html", context);

        sendMail(to, subject, body);
    }

    private void sendMail(String to, String subject, String body) {
        final MimeMessagePreparator messagePreparator =
                mimeMessage -> {
                    final MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                    helper.setFrom(NOREPLY_GPUISMINE_COM);
                    helper.setTo(to);
                    helper.setSubject(subject);
                    helper.setText(body, true);
                };
        mailSender.send(messagePreparator);
    }
}
