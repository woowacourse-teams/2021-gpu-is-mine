package mine.is.gpu.gpuserver.dto.response;

import java.util.List;

public class GpuServerMainPageResponses {
    private List<GpuServerMainPageResponse> gpuServerMainPageRespons;

    public GpuServerMainPageResponses() {
    }

    private GpuServerMainPageResponses(List<GpuServerMainPageResponse> gpuServerMainPageRespons) {
        this.gpuServerMainPageRespons = gpuServerMainPageRespons;
    }

    public static GpuServerMainPageResponses of(List<GpuServerMainPageResponse> gpus) {
        return new GpuServerMainPageResponses(gpus);
    }

    public List<GpuServerMainPageResponse> getGpuServers() {
        return gpuServerMainPageRespons;
    }
}
