package mine.is.gpu.mail;

public class MailDto {
    private String email;
    private String jobName;

    public MailDto(String email, String jobName) {
        this.email = email;
        this.jobName = jobName;
    }

    public String getEmail() {
        return email;
    }

    public String getJobName() {
        return jobName;
    }
}
