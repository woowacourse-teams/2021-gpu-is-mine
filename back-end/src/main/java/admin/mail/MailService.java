package admin.mail;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

@Service
@PropertySource(value = {"classpath:application-mail.properties"})
public class MailService {
    @Value("${spring.mail.from}")
    private String fromEmail;
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    public MailService(JavaMailSender mailSender, SpringTemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    @Async("mailExecutor")
    public void sendJobReserveMail(MailDto mailDto) {
        Context context = new Context();
        context.setVariable("jobName", mailDto.getJobName());
        String subject = "[GPU-IS_MINE] Job 예약 완료 메일";
        String body = templateEngine.process("job-reserve.html", context);
        sendMail(mailDto.getEmail(), subject, body);
    }

    @Async("mailExecutor")
    public void sendJobCancelMail(MailDto mailDto) {
        Context context = new Context();
        context.setVariable("jobName", mailDto.getJobName());
        String subject = "[GPU-IS_MINE] Job 취소 완료 메일";
        String body = templateEngine.process("job-cancel.html", context);
        sendMail(mailDto.getEmail(), subject, body);
    }

    @Async("mailExecutor")
    public void sendJobStartMail(MailDto mailDto) {
        Context context = new Context();
        context.setVariable("jobName", mailDto.getJobName());
        String subject = "[GPU-IS_MINE] Job 시작 알림 메일";
        String body = templateEngine.process("job-start.html", context);
        sendMail(mailDto.getEmail(), subject, body);
    }

    @Async("mailExecutor")
    public void sendJobEndMail(MailDto mailDto) {
        Context context = new Context();
        context.setVariable("jobName", mailDto.getJobName());
        String subject = "[GPU-IS_MINE] Job 종료 알림 메일";
        String body = templateEngine.process("job-end.html", context);
        sendMail(mailDto.getEmail(), subject, body);
    }

    private void sendMail(String to, String subject, String body) {
        final MimeMessagePreparator messagePreparator =
                mimeMessage -> {
                    final MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
                    helper.setFrom(fromEmail);
                    helper.setTo(to);
                    helper.setSubject(subject);
                    helper.setText(body, true);
                };
        mailSender.send(messagePreparator);
    }
}
