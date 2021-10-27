package mine.is.gpu.job.domain;

import java.time.LocalDateTime;

public class CalculatedTime {

    private LocalDateTime createdTime = null;
    private LocalDateTime startedTime = null;
    private LocalDateTime expectedStartedTime = null;
    private LocalDateTime completedTime = null;
    private LocalDateTime expectedCompletedTime = null;

    public CalculatedTime() {
    }

    public CalculatedTime(Job job) {
        this.createdTime = job.getCreatedAt();
        this.startedTime = job.getStartedTime();
        this.completedTime = job.getCompletedTime();
        this.expectedStartedTime = job.getExpectedStartedTime();
        this.expectedCompletedTime = job.getExpectedCompletedTime();
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public LocalDateTime getStartedTime() {
        return startedTime;
    }

    public LocalDateTime getExpectedStartedTime() {
        return expectedStartedTime;
    }

    public LocalDateTime getCompletedTime() {
        return completedTime;
    }

    public LocalDateTime getExpectedCompletedTime() {
        return expectedCompletedTime;
    }
}
