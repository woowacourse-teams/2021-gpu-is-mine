package mine.is.gpu.job.dto.response;

import java.util.List;
import java.util.stream.Collectors;
import mine.is.gpu.job.domain.CalculatedTime;
import mine.is.gpu.job.domain.Job;
import mine.is.gpu.job.domain.JobStatus;

public class JobResponse {
    private Long id;
    private String name;
    private JobStatus status;
    private Long memberId;
    private String memberName;
    private Long gpuServerId;
    private String gpuServerName;
    private String metaData;
    private String expectedTime;
    private CalculatedTime calculatedTime;

    private JobResponse() {
    }

    private JobResponse(Long id, String name, JobStatus status, Long memberId,
                        String memberName, Long gpuServerId, String gpuServerName,
                        String metaData, String expectedTime, CalculatedTime calculatedTime) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.memberId = memberId;
        this.memberName = memberName;
        this.gpuServerId = gpuServerId;
        this.gpuServerName = gpuServerName;
        this.metaData = metaData;
        this.expectedTime = expectedTime;
        this.calculatedTime = calculatedTime;
    }

    public static JobResponse of(Job job) {
        return new JobResponse(
                job.getId(),
                job.getName(),
                job.getStatus(),
                job.getMember().getId(),
                job.getMember().getName(),
                job.getGpuServer().getId(),
                job.getGpuServer().getName(),
                job.getMetaData(),
                job.getExpectedTime(),
                new CalculatedTime(job)
        );
    }

    public static List<JobResponse> listOf(List<Job> jobs) {
        return jobs.stream()
                .map(JobResponse::of)
                .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public JobStatus getStatus() {
        return status;
    }

    public Long getMemberId() {
        return memberId;
    }

    public String getMemberName() {
        return memberName;
    }

    public Long getGpuServerId() {
        return gpuServerId;
    }

    public String getGpuServerName() {
        return gpuServerName;
    }

    public String getMetaData() {
        return metaData;
    }

    public String getExpectedTime() {
        return expectedTime;
    }

    public CalculatedTime getCalculatedTime() {
        return calculatedTime;
    }
}
