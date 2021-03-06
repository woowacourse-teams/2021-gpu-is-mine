package mine.is.gpu.gpuserver.dto.response;

import java.util.List;

public class GpuServerResponses {
    private List<GpuServerResponse> gpuServers;

    public GpuServerResponses() {
    }

    private GpuServerResponses(List<GpuServerResponse> gpuServers) {
        this.gpuServers = gpuServers;
    }

    public static GpuServerResponses of(List<GpuServerResponse> gpus) {
        return new GpuServerResponses(gpus);
    }

    public List<GpuServerResponse> getGpuServers() {
        return gpuServers;
    }
}
