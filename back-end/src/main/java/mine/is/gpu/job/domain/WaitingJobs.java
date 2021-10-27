package mine.is.gpu.job.domain;

import java.time.LocalDateTime;
import java.util.List;
import mine.is.gpu.job.exception.JobException;

public class WaitingJobs {
    private static final int FIRST = 0;
    private final List<Job> jobs;

    public WaitingJobs(List<Job> jobs) {
        if (!jobs.stream().allMatch(Job::isWaiting)) {
            throw new IllegalArgumentException("Waiting 상태가 아닌 Job이 존재합니다.");
        }
        this.jobs = jobs;
    }

    public void syncExpectation(LocalDateTime firstExpectedStartedTime) {
        LocalDateTime time = firstExpectedStartedTime;
        for (Job job : jobs) {
            job.updateExpectedStartedTime(time);
            time = job.getExpectedCompletedTime();
        }
    }

    public Job getFirst() {
        if (jobs.isEmpty()) {
            throw JobException.NO_WAITING_JOB.getException();
        }
        return jobs.get(FIRST);
    }
}
