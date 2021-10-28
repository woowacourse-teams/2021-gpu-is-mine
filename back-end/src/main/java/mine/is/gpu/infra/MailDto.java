package mine.is.gpu.infra;

public class MailDto {
    private String email;
    private String jobName;
    private Long jobId;

    public MailDto() {
    }

    public MailDto(String email, String jobName, Long jobId) {
        this.email = email;
        this.jobName = jobName;
        this.jobId = jobId;
    }

    public String getEmail() {
        return email;
    }

    public String getJobName() {
        return jobName;
    }

    public Long getJobId() {
        return jobId;
    }
}
