package mine.is.gpu.infra;

import mine.is.gpu.account.domain.Member;
import mine.is.gpu.job.domain.Job;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class JobEventListener {
    private final MailService mailService;

    public JobEventListener(MailService mailService) {
        this.mailService = mailService;
    }

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT, classes = JobEvent.class)
    public void handle(JobEvent event) {
        Job job = event.getJob();
        Member member = job.getMember();

        mailService.sendJobMail(member.getEmail(), job.getStatus(), new SendableJobData(job.getId(), job.getName()));
    }
}
