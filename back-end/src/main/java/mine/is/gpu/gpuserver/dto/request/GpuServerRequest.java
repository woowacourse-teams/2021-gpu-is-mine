package mine.is.gpu.gpuserver.dto.request;

import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.lab.domain.Lab;

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

    public GpuServer toEntity(Lab lab) {
        return new GpuServer(serverName, memorySize, diskSize, lab);
    }
}
