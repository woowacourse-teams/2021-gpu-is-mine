package mine.is.gpu.job.dto;

import java.time.LocalDateTime;
import mine.is.gpu.job.domain.Job;

public class CalculatedTime {

    private LocalDateTime createdTime;
    private LocalDateTime startedTime;
    private LocalDateTime expectedStartedTime;
    private LocalDateTime completedTime;
    private LocalDateTime expectedCompletedTime;

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
