package admin.gpuserver.dto.response;

import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import java.util.List;

public class GpuServerResponse {

    private Long id;
    private String serverName;
    private Long memorySize;
    private Long diskSize;
    private Boolean isOn;
    private GpuBoardResponse gpuBoard;
    private List<JobResponse> jobs;

    public GpuServerResponse() {
    }

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

    public Long getId() {
        return id;
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

    public Boolean getIsOn() {
        return isOn;
    }

    public GpuBoardResponse getGpuBoard() {
        return gpuBoard;
    }

    public List<JobResponse> getJobs() {
        return jobs;
    }
}
