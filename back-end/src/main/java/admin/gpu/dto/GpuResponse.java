package admin.gpu.dto;

public class GpuResponse {
    private final String serverName;
    private final String status;
    private final Double memory;
    private final Double usingMemory;
    private final Double usingCpu;
    private final Double gpuPerformance;
    private final JobDtos jobDtos;

    public GpuResponse(String serverName, String status, Double memory, Double usingMemory, Double usingCpu, Double gpuPerformance, JobDtos jobDtos) {
        this.serverName = serverName;
        this.status = status;
        this.memory = memory;
        this.usingMemory = usingMemory;
        this.usingCpu = usingCpu;
        this.gpuPerformance = gpuPerformance;
        this.jobDtos = jobDtos;
    }

    public String getServerName() {
        return serverName;
    }

    public String getStatus() {
        return status;
    }

    public Double getMemory() {
        return memory;
    }

    public Double getUsingMemory() {
        return usingMemory;
    }

    public Double getUsingCpu() {
        return usingCpu;
    }

    public Double getGpuPerformance() {
        return gpuPerformance;
    }

    public JobDtos getJobDtos() {
        return jobDtos;
    }
}
