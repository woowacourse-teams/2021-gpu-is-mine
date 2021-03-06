package mine.is.gpu.job.dto.request;

import java.util.Random;
import mine.is.gpu.account.domain.Member;
import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.job.domain.Job;

public class JobRequest {
    private Long gpuServerId;
    private String name;
    private String metaData;
    private String expectedTime;

    public JobRequest() {
    }

    public JobRequest(Long gpuServerId, String name, String metaData) {
        this.gpuServerId = gpuServerId;
        this.name = name;
        this.metaData = metaData;
        this.expectedTime = String.valueOf(new Random().nextInt(30) + 1);
    }

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

    public Job toEntity(GpuBoard gpuBoard, Member member) {
        return new Job(name, gpuBoard, member, metaData, expectedTime);
    }
}
