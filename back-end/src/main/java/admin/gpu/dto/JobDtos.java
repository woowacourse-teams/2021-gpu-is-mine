package admin.gpu.dto;

public class JobDtos {
    private final RunningJobDto runningJobDto;
    private final WaitingJobDtos waitingJobDtos;

    public JobDtos(RunningJobDto runningJobDto, WaitingJobDtos waitingJobDtos) {
        this.runningJobDto = runningJobDto;
        this.waitingJobDtos = waitingJobDtos;
    }

    public RunningJobDto getRunningJobDto() {
        return runningJobDto;
    }

    public WaitingJobDtos getWaitingJobDtos() {
        return waitingJobDtos;
    }
}
