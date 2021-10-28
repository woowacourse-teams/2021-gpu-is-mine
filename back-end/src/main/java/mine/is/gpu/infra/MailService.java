package mine.is.gpu.infra;

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
        context.setVariable("title", "예약이 완료 되었습니다.");
        context.setVariable("jobName", mailDto.getJobName());
        String subject = "[GPU-IS_MINE] Job 예약 완료 메일";
        String body = templateEngine.process("basic-template.html", context);
        sendMail(mailDto.getEmail(), subject, body);
    }

    @Async("mailExecutor")
    public void sendJobCancelMail(MailDto mailDto) {
        Context context = new Context();
        context.setVariable("title", "예약이 취소 되었습니다.");
        context.setVariable("jobName", mailDto.getJobName());
        String subject = "[GPU-IS_MINE] Job 취소 완료 메일";
        String body = templateEngine.process("basic-template.html", context);
        sendMail(mailDto.getEmail(), subject, body);
    }

    @Async("mailExecutor")
    public void sendJobStartMail(MailDto mailDto) {
        Context context = new Context();
        context.setVariable("title", "학습이 시작 되었습니다.");
        context.setVariable("jobName", mailDto.getJobName());
        String subject = "[GPU-IS_MINE] Job 시작 알림 메일";
        String body = templateEngine.process("basic-template.html", context);
        sendMail(mailDto.getEmail(), subject, body);
    }

    @Async("mailExecutor")
    public void sendJobEndMail(MailDto mailDto) {
        Context context = new Context();
        String subject = "[GPU-IS_MINE] Job 종료 알림";
        context.setVariable("title", subject);
        context.setVariable("content", mailDto.getJobName() + "가 종료 되었습니다.");
        String body = templateEngine.process("basic-template.html", context);
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
