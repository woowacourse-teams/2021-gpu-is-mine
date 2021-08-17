package mine.is.gpu.gpuserver.dto.response;

import java.util.List;
import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.job.domain.Job;
import mine.is.gpu.job.dto.response.JobResponse;

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

    private GpuServerResponse(Long id, String serverName, Long memorySize, Long diskSize, Boolean isOn,
                              GpuBoardResponse gpuBoard, List<JobResponse> jobs) {
        this.id = id;
        this.serverName = serverName;
        this.memorySize = memorySize;
        this.diskSize = diskSize;
        this.isOn = isOn;
        this.gpuBoard = gpuBoard;
        this.jobs = jobs;
    }

    public static GpuServerResponse of(GpuServer gpuServer, GpuBoard gpuBoard, List<Job> jobs) {
        return new GpuServerResponse(
                gpuServer.getId(),
                gpuServer.getName(),
                gpuServer.getMemorySize(),
                gpuServer.getDiskSize(),
                gpuServer.getIsOn(),
                GpuBoardResponse.of(gpuBoard),
                JobResponse.listOf(jobs)
        );
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
