package gpu.is.mine.worker.dto;

public class WorkerJobLogRequest {
    private String content;

    public WorkerJobLogRequest() {
    }

    public WorkerJobLogRequest(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }
}
