package mine.is.gpu.gpuserver.dto.response;

import java.util.List;

public class GpuServerSummaryResponses {
    private List<GpuServerSummaryResponse> gpuServerSummaryResponses;

    private GpuServerSummaryResponses(List<GpuServerSummaryResponse> gpuServerSummaryResponses) {
        this.gpuServerSummaryResponses = gpuServerSummaryResponses;
    }

    public static GpuServerSummaryResponses of(List<GpuServerSummaryResponse> gpus) {
        return new GpuServerSummaryResponses(gpus);
    }

    public List<GpuServerSummaryResponse> getGpuServers() {
        return gpuServerSummaryResponses;
    }
}
