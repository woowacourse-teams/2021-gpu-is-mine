package admin.gpuserver.dto.response;

import java.util.List;

public class GpuServerResponses {

    private List<GpuServerResponse> gpuServers;

    private GpuServerResponses(List<GpuServerResponse> gpuServers) {
        this.gpuServers = gpuServers;
    }

    public GpuServerResponses() {
    }

    public static GpuServerResponses of(List<GpuServerResponse> gpus) {
        return new GpuServerResponses(gpus);
    }

    public List<GpuServerResponse> getGpuServers() {
        return gpuServers;
    }
}
