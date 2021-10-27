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
            job.updateExpectedStartedTime(prev.getExpectedCompletedTime());
            prev = job;
        }
    }

    public Job getFirst() {
        validateHasValue();
        return jobs.get(FIRST);
    }

    public Job getLast() {
        validateHasValue();
        return jobs.get(jobs.size() - 1);
    }

    private void validateHasValue() {
        if (jobs.isEmpty()) {
            throw JobException.NO_WAITING_JOB.getException();
        }
    }

    public boolean isEmpty() {
        return jobs.isEmpty();
    }
}
