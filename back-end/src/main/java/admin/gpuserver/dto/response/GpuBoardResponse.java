package admin.gpuserver.dto.response;

import admin.gpuserver.domain.GpuBoard;

public class GpuBoardResponse {
    private Long id;
    private String modelName;
    private Long performance;
    private Boolean isWorking;

    public GpuBoardResponse() {
    }

    private GpuBoardResponse(Long id, String modelName, Long performance, Boolean isWorking) {
        this.id = id;
        this.modelName = modelName;
        this.performance = performance;
        this.isWorking = isWorking;
    }

    public GpuBoardResponse(GpuBoard gpuBoard) {
        this(gpuBoard.getId(), gpuBoard.getModelName(), gpuBoard.getPerformance(), gpuBoard.getIsWorking());
    }

    public Long getId() {
        return id;
    }

    public String getModelName() {
        return modelName;
    }

    public Long getPerformance() {
        return performance;
    }

    public Boolean getIsWorking() {
        return isWorking;
    }
}
