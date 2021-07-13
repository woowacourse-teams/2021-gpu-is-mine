package admin.gpuserver.dto.response;

import java.util.List;

public class GpuServerResponses {

    private List<GpuServerResponse> gpus;

    public GpuServerResponses() {
    }

    public GpuServerResponses(List<GpuServerResponse> gpus) {
        this.gpus = gpus;
    }

    public List<GpuServerResponse> getGpus() {
        return gpus;
    }
}
