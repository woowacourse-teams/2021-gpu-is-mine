package admin.job.dto.request;

public class JobRequest {
    private Long gpuServerId;
    private String name;
    private String metaData;
    private String expectedTime;

    public JobRequest(Long gpuServerId, String name, String metaData, String expectedTime) {
        this.gpuServerId = gpuServerId;
        this.name = name;
        this.metaData = metaData;
        this.expectedTime = expectedTime;
    }

    public Long getGpuServerId() {
        return gpuServerId;
    }

    public String getName() {
        return name;
    }

    public String getMetaData() {
        return metaData;
    }

    public String getExpectedTime() {
        return expectedTime;
    }
}
