package mine.is.gpu.job.domain;

import java.time.LocalDateTime;

public class CalculatedTime {

    private LocalDateTime createdTime = null;
    private LocalDateTime startedTime = null;
    private LocalDateTime expectedStartedTime = null;
    private LocalDateTime endedTime = null;
    private LocalDateTime expectedCompletedTime = null;

    public CalculatedTime() {
    }

    public CalculatedTime(Job job, Long usageTime, String expectedTime) {
        this.createdTime = job.getCreatedAt();
        this.startedTime = job.getStartedTime();
        this.endedTime = job.getEndedTime();
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

    public LocalDateTime getEndedTime() {
        return endedTime;
    }

    public LocalDateTime getExpectedCompletedTime() {
        return expectedCompletedTime;
    }
}
