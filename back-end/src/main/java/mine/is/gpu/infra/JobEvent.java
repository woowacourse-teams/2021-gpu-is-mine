package mine.is.gpu.infra;

import mine.is.gpu.job.domain.Job;
import org.springframework.context.ApplicationEvent;

public class JobEvent extends ApplicationEvent {
    private final Job job;

    public JobEvent(Object source, Job job) {
        super(source);
        this.job = job;
    }

    public Job getJob() {
        return job;
    }
}
