package admin.job.dto.request;

import admin.gpuserver.domain.GpuBoard;
import admin.job.domain.Job;
import admin.member.domain.Member;

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

    public Job toEntity(GpuBoard gpuBoard, Member member) {
        return new Job(name, gpuBoard, member, metaData, expectedTime);
    }
}
