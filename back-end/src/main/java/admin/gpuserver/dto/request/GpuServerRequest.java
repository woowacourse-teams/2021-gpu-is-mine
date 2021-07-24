package admin.gpuserver.dto.request;

public class GpuServerRequest {

    private String serverName;
    private Long memorySize;
    private Long diskSize;
    private GpuBoardRequest gpuBoardRequest;

    public GpuServerRequest() {
    }

    public GpuServerRequest(String serverName, Long memorySize, Long diskSize,
            GpuBoardRequest gpuBoardRequest) {
        this.serverName = serverName;
        this.memorySize = memorySize;
        this.diskSize = diskSize;
        this.gpuBoardRequest = gpuBoardRequest;
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
