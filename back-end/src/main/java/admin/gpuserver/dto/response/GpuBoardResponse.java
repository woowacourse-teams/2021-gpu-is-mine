package admin.gpuserver.dto.response;

import admin.gpuserver.domain.GpuBoard;

public class GpuBoardResponse {
    private Long id;
    private String modelName;
    private Long performance;
    private Boolean isWorking;

    private GpuBoardResponse(Long id, String modelName, Long performance, Boolean isWorking) {
        this.id = id;
        this.modelName = modelName;
        this.performance = performance;
        this.isWorking = isWorking;
    }

    private GpuBoardResponse(GpuBoard gpuBoard) {
        this(gpuBoard.getId(), gpuBoard.getModelName(), gpuBoard.getPerformance(), gpuBoard.getIsWorking());
    }

    public GpuBoardResponse() {
    }

    public static GpuBoardResponse of(GpuBoard gpuBoard) {
        return new GpuBoardResponse(gpuBoard);
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
