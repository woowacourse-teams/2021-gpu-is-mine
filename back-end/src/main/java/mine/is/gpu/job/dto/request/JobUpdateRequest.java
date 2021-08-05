package mine.is.gpu.job.dto.request;

public class JobUpdateRequest {
    private String name;

    public JobUpdateRequest(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
