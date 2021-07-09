package admin.gpuserver.dto;

import java.util.List;

public class WaitingJobDtos {
    private final List<WaitingJobDto> waitingJobDtos;

    public WaitingJobDtos(List<WaitingJobDto> waitingJobDtos) {
        this.waitingJobDtos = waitingJobDtos;
    }

    public List<WaitingJobDto> getWaitingJobDtos() {
        return waitingJobDtos;
    }
}
