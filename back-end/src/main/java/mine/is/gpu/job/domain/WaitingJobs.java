package mine.is.gpu.job.domain;

import java.time.LocalDateTime;
import java.util.List;
import mine.is.gpu.job.exception.JobException;

public class WaitingJobs {
    private static final int FIRST = 0;
    private final List<Job> jobs;

    public WaitingJobs(List<Job> jobs) {
        for (Job job : jobs) {
            if (!job.getStatus().isWaiting()) {
                throw new IllegalArgumentException();
            }
        }
        this.jobs = jobs;
    }

    public void syncExpectation(LocalDateTime firstExpectedStartedTime) {
        if (jobs.isEmpty()) {
            return;
        }

        Job firstWaitingJob = getFirst();
        firstWaitingJob.updateExpectedStartedTime(firstExpectedStartedTime);

        Job prev = firstWaitingJob;
        for (Job job : jobs) {
            if (!prev.getId().equals(job.getId())) {
                job.updateExpectedStartedTime(prev.getExpectedCompletedTime());
                prev = job;
            }
        }
    }

    public Job getFirst() {
        validateHasValue();
        return jobs.get(FIRST);
    }

    private void validateHasValue() {
        if (jobs.isEmpty()) {
            throw JobException.NO_WAITING_JOB.getException();
        }
    }
}
