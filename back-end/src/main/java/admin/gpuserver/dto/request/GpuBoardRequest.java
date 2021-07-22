package admin.gpuserver.dto.request;

public class GpuBoardRequest {
    private String modelName;
    private Long performance;

    public GpuBoardRequest() {
    }

    public GpuBoardRequest(String modelName, Long performance) {
        this.modelName = modelName;
        this.performance = performance;
    }

    public String getModelName() {
        return modelName;
    }

    public Long getPerformance() {
        return performance;
    }
}
