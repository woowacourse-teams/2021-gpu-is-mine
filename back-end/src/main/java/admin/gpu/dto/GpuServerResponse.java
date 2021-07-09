package admin.gpu.dto;

import admin.gpu.domain.GpuBoard;
import admin.gpu.domain.GpuServer;

import java.util.List;

public class GpuServerResponse {

    private final Long id;
    private final String serverName;
    private final Long memorySize;
    private final Long diskSize;
    private final Boolean isOn;
    private final GpuBoardResponse gpuBoard;
    private final List<JobResponse> jobs;

    public GpuServerResponse(Long id, String serverName, Long memorySize, Long diskSize, Boolean isOn, GpuBoardResponse gpuBoard, List<JobResponse> jobs) {
        this.id = id;
        this.serverName = serverName;
        this.memorySize = memorySize;
        this.diskSize = diskSize;
        this.isOn = isOn;
        this.gpuBoard = gpuBoard;
        this.jobs = jobs;
    }

    public GpuServerResponse(GpuServer gpuServer, GpuBoard gpuBoard) {
        this(gpuServer.getId(),
                gpuServer.getName(),
                gpuServer.getMemorySize(),
                gpuServer.getDiskSize(),
                gpuServer.getIsOn(),
                new GpuBoardResponse(gpuBoard),
                JobResponse.listOf(gpuBoard.getJobs()));
    }

    public String getServerName() {
        return serverName;
    }
}
