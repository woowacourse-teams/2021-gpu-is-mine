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

    public CalculatedTime(Job job, Long usageTime, String expectedTime) {
        this.createdTime = job.getCreatedAt();
        this.startedTime = job.getStartedTime();
        this.completedTime = job.getCompletedTime();
        this.expectedStartedTime = createdTime.plusHours(usageTime);
        this.expectedCompletedTime = expectedStartedTime.plusHours(Long.parseLong(expectedTime));
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
