package admin.gpuserver.dto;

public class GpuServerRequest {

    private String serverName;
    private Long memorySize;
    private Long diskSize;
    private GpuBoardRequest gpuBoardRequest;

    public GpuServerRequest() {
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
