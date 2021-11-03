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

    private static final Map<JobStatus, MailComponent> mailContentMapper = new HashMap<>();

    static {
        mailContentMapper.put(JobStatus.WAITING, new MailComponent("[GPU-IS-MINE] Job 예약 알림", "예약 되었습니다."));
        mailContentMapper.put(JobStatus.CANCELED, new MailComponent("[GPU-IS-MINE] Job 취소 알림", "취소 되었습니다."));
        mailContentMapper.put(JobStatus.RUNNING, new MailComponent("[GPU-IS-MINE] Job 시작 알림", "시작 되었습니다."));
        mailContentMapper.put(JobStatus.COMPLETED, new MailComponent("[GPU-IS-MINE] Job 종료 알림", "종료 되었습니다."));
        mailContentMapper.put(JobStatus.FAILED, new MailComponent("[GPU-IS-MINE] Job 실패 알림", "실패 되었습니다."));
    }

    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;
    @Value("${spring.mail.from}")
    private String fromEmail;

    public MailService(JavaMailSender mailSender, SpringTemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    @Async("mailExecutor")
    public void sendJobMail(String email, JobStatus status, SendableJobData sendableJobData) {
        MailComponent mailComponent = mailContentMapper.get(status);

        Context context = new Context();
        String subject = mailComponent.getSubject();
        context.setVariable("title", subject);
        context.setVariable("jobName", sendableJobData.getJobName());
        context.setVariable("content", mailComponent.getContent());
        context.setVariable("url", "https://www.gpuismine.com/job/view/" + sendableJobData.getJobId());
        String body = templateEngine.process("basic-template.html", context);
        sendMail(email, subject, body);
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

    private static class MailComponent {
        private final String subject;
        private final String content;

        public MailComponent(String subject, String content) {
            this.subject = subject;
            this.content = content;
        }

        public String getSubject() {
            return subject;
        }

        public String getContent() {
            return content;
        }
    }
}
