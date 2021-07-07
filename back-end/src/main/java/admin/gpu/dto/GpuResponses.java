package admin.gpu.dto;

import java.util.List;

public class GpuResponses {
    List<GpuResponse> gpuResponses;

    public GpuResponses(List<GpuResponse> gpuResponses) {
        this.gpuResponses = gpuResponses;
    }

    public List<GpuResponse> getGpuResponses() {
        return gpuResponses;
    }
}
