package mine.is.gpu.infra;

import java.util.HashMap;
import java.util.Map;
import mine.is.gpu.job.domain.JobStatus;
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
    private final static Map<JobStatus, MailComponent> mailContentMapper = new HashMap<>();

    static {
        mailContentMapper.put(JobStatus.WAITING, new MailComponent("[GPU-IS_MINE] Job 예약 알림", "예약 되었습니다."));
        mailContentMapper.put(JobStatus.CANCELED, new MailComponent("[GPU-IS_MINE] Job 취소 알림", "취소 되었습니다."));
        mailContentMapper.put(JobStatus.RUNNING, new MailComponent("[GPU-IS_MINE] Job 시작 알림", "시작 되었습니다."));
        mailContentMapper.put(JobStatus.COMPLETED, new MailComponent("[GPU-IS_MINE] Job 종료 알림", "종료 되었습니다."));
    }

    @Value("${spring.mail.from}")
    private String fromEmail;
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    public MailService(JavaMailSender mailSender, SpringTemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    @Async("mailExecutor")
    public void sendJobMail(JobStatus status, MailDto mailDto) {
        MailComponent mailComponent = mailContentMapper.get(status);

        Context context = new Context();
        String subject = mailComponent.getSubject();
        context.setVariable("title", subject);
        context.setVariable("jobName", mailDto.getJobName());
        context.setVariable("content", mailComponent.getContent());
        context.setVariable("url", "https://www.gpuismine.com/job/view/" + mailDto.getJobId());
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
