package admin.gpuserver.dto;

import admin.gpuserver.domain.GpuBoard;

public class GpuBoardResponse {
    private final Long id;
    private final String modelName;
    private final Long performance;
    private final Boolean isWorking;

    private GpuBoardResponse(Long id, String modelName, Long performance, Boolean isWorking) {
        this.id = id;
        this.modelName = modelName;
        this.performance = performance;
        this.isWorking = isWorking;
    }

    public GpuBoardResponse(GpuBoard gpuBoard) {
        this(gpuBoard.getId(), gpuBoard.getModelName(), gpuBoard.getPerformance(), gpuBoard.getIsWorking());
    }
}
