package admin.gpu.application;

import admin.gpu.domain.GpuServer;
import admin.gpu.dto.GpuServerResponse;
import java.util.List;
import java.util.stream.Collectors;

public class GpuServerResponses {

    private List<GpuServerResponse> gpus;

    public GpuServerResponses(List<GpuServer> gpus) {
        this.gpus = gpus.stream()
            .map(gpuServer -> new GpuServerResponse(gpuServer, gpuServer.getGpuBoard()))
            .collect(Collectors.toList());
    }
}
