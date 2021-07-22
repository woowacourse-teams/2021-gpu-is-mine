package admin.worker;

import admin.job.domain.Job;
import admin.job.dto.response.JobResponse;
import org.springframework.stereotype.Service;

@Service
public class WorkerJobService {
    private WorkerJobRepository workerJobRepository;

    public JobResponse popJobByServerId(Long serverId) {
        Job job = workerJobRepository.findOneByServerId(serverId);
        return JobResponse.of(job);
    }
}
