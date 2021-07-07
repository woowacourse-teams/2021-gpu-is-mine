package admin.gpu.dto;

public class WaitingJobDto {
    private final String name;
    private final String expectedRunningTime;

    public WaitingJobDto(String name, String expectedRunningTime) {
        this.name = name;
        this.expectedRunningTime = expectedRunningTime;
    }

    public String getName() {
        return name;
    }

    public String getExpectedRunningTime() {
        return expectedRunningTime;
    }
}
