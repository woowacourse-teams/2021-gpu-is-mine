package admin.gpu.dto;

public class GpuRequest {
    private String serverName;
    private Long memorySize;
    private Long diskSize;
    private GpuBoardRequest gpuBoardRequest;

    public GpuRequest() {
    }

    public String getServerName() {
        return serverName;
    }

    public Long getMemorySize() {
        return memorySize;
    }

    public Long getDiskSize() {
        return diskSize;
    }

    public GpuBoardRequest getGpuBoardRequest() {
        return gpuBoardRequest;
    }
}
