package admin.gpu.application;

import admin.gpu.domain.GpuServerRepository;
import admin.gpu.dto.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class GpuService {
    private final GpuServerRepository gpuServerRepository;

    public GpuService(GpuServerRepository gpuServerRepository) {
        this.gpuServerRepository = gpuServerRepository;
    }

    public int register(GpuRequest gpuRequest) {
        return 0;
    }

    public GpuResponse detail(Long labId, Long gpuId) {
        RunningJobDto runningJob = new RunningJobDto("집1", "5시간", 500L, 100L);
        WaitingJobDto waitingJob = new WaitingJobDto("기다리는 잡", "10시간");
        WaitingJobDtos waitingJobDtos = new WaitingJobDtos(Collections.singletonList(waitingJob));
        JobDtos jobDtos = new JobDtos(runningJob, waitingJobDtos);
        return new GpuResponse("서버이름", "dead", 50.0, 50.0, 50.0, 50.1, jobDtos);
    }

    public GpuResponses gpuList(Long labId) {
        return new GpuResponses(Collections.emptyList());
    }

    public void modify(GpuRequest gpuRequest, Long labId, Long gpuId) {
    }

    public void delete(Long labId, Long gpuId) {
    }
}
