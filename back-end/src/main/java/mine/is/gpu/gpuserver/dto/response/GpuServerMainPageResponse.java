package mine.is.gpu.gpuserver.dto.response;

import java.util.List;
import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.job.domain.Job;
import mine.is.gpu.job.dto.response.JobMainPageResponse;

public class GpuServerMainPageResponse {
    private Long id;
    private String serverName;
    private Long memorySize;
    private Long diskSize;
    private Boolean isOn;
    private GpuBoardResponse gpuBoard;
    private List<JobMainPageResponse> runningJobs;
    private Integer waitingJobCount;
    private Long totalExpectedTime;

    private GpuServerMainPageResponse(Long id, String serverName, Long memorySize, Long diskSize, Boolean isOn,
                                     GpuBoardResponse board, List<JobMainPageResponse> runningJobs,
                                     Integer waitingJobCount, Long totalExpectedTime) {
        this.id = id;
        this.serverName = serverName;
        this.memorySize = memorySize;
        this.diskSize = diskSize;
        this.isOn = isOn;
        this.gpuBoard = board;
        this.runningJobs = runningJobs;
        this.waitingJobCount = waitingJobCount;
        this.totalExpectedTime = totalExpectedTime;
    }

    public static GpuServerMainPageResponse of(GpuServer server, GpuBoard board, List<Job> runningJobs,
                                              Integer waitingJobCount, Long totalExpectedTime) {
        return new GpuServerMainPageResponse(
                server.getId(),
                server.getName(),
                server.getMemorySize(),
                server.getDiskSize(),
                server.getIsOn(),
                GpuBoardResponse.of(board),
                JobMainPageResponse.listOf(runningJobs),
                waitingJobCount,
                totalExpectedTime
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

    public List<JobMainPageResponse> getRunningJobs() {
        return runningJobs;
    }

    public Integer getWaitingJobCount() {
        return waitingJobCount;
    }

    public Long getTotalExpectedTime() {
        return totalExpectedTime;
    }
}
