package mine.is.gpu.infra;

public class SendableJobData {
    private Long jobId;
    private String jobName;

    public SendableJobData(Long jobId, String jobName) {
        this.jobId = jobId;
        this.jobName = jobName;
    }

    public Long getJobId() {
        return jobId;
    }

    public String getJobName() {
        return jobName;
    }
}

