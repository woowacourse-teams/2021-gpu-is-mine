package mine.is.gpu.gpuserver.dto.request;

import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.GpuServer;

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

    public GpuBoard toEntity(GpuServer gpuServer) {
        return new GpuBoard(performance, modelName, gpuServer);
    }
}
