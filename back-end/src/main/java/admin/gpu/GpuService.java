package admin.gpu;

import admin.gpu.dto.GpuRequest;
import admin.gpu.dto.GpuResponse;
import admin.gpu.dto.GpuResponses;
import admin.gpu.dto.JobDtos;
import admin.gpu.dto.RunningJobDto;
import admin.gpu.dto.WaitingJobDto;
import admin.gpu.dto.WaitingJobDtos;
import java.util.Collections;
import org.springframework.stereotype.Service;

@Service
public class GpuService {

    public int register(GpuRequest gpuRequest) {
        return 0;
    }

    public GpuResponse detail(Long labId, Long gpuId) {
        RunningJobDto runningJob = new RunningJobDto("집1", "5시간", 500L, 100L);
        WaitingJobDto waitingJob = new WaitingJobDto("기다리는 잡", "10시간");
        WaitingJobDtos waitingJobDtos = new WaitingJobDtos(Collections.singletonList(waitingJob));
        JobDtos jobDtos = new JobDtos(runningJob, waitingJobDtos);
        return new GpuResponse("서버이름", "dead", 50.0, 50.0, 50.0,50.1, jobDtos);
    }

    public GpuResponses gpuList(Long labId) {
        return new GpuResponses(Collections.emptyList());
    }

    public void modify(GpuRequest gpuRequest, Long labId, Long gpuId) {
    }

    public void delete(Long labId, Long gpuId) {
    }
}