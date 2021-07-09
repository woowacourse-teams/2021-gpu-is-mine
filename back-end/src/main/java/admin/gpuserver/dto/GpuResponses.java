package admin.gpuserver.dto;

import java.util.List;

public class GpuResponses {
    List<GpuServerResponse> gpuBoardRespons;

    public GpuResponses(List<GpuServerResponse> gpuBoardRespons) {
        this.gpuBoardRespons = gpuBoardRespons;
    }

    public List<GpuServerResponse> getGpuResponses() {
        return gpuBoardRespons;
    }
}
