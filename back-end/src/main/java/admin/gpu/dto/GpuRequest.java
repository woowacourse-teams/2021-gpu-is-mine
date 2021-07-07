package admin.gpu.dto;

public class GpuRequest {
    private String serverName;
    private Double memorySize;
    private Double diskSize;
    private Double gpuPerformance;
    private String gpuName;

    public GpuRequest() {
    }

    public String getServerName() {
        return serverName;
    }

    public Double getMemorySize() {
        return memorySize;
    }

    public Double getDiskSize() {
        return diskSize;
    }

    public Double getGpuPerformance() {
        return gpuPerformance;
    }

    public String getGpuName() {
        return gpuName;
    }
}
