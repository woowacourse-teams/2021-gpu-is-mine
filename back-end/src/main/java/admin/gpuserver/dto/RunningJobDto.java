package admin.gpuserver.dto;

public class RunningJobDto {
    private final String name;
    private final String expectedRunningTime;
    private final Long epoch;
    private final Long completedEpoch;

    public RunningJobDto(String name, String expectedRunningTime, Long epoch, Long completedEpoch) {
        this.name = name;
        this.expectedRunningTime = expectedRunningTime;
        this.epoch = epoch;
        this.completedEpoch = completedEpoch;
    }

    public String getName() {
        return name;
    }

    public String getExpectedRunningTime() {
        return expectedRunningTime;
    }

    public Long getEpoch() {
        return epoch;
    }

    public Long getCompletedEpoch() {
        return completedEpoch;
    }
}
