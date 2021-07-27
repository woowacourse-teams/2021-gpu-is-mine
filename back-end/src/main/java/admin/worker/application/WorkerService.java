package admin.worker.application;

import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import admin.gpuserver.domain.repository.GpuBoardRepository;
import admin.gpuserver.domain.repository.GpuServerRepository;
import admin.gpuserver.exception.GpuBoardException;
import admin.gpuserver.exception.GpuServerException;
import admin.job.domain.Job;
import admin.job.domain.JobStatus;
import admin.job.domain.repository.JobRepository;
import admin.job.dto.response.JobResponse;
import admin.job.exception.JobException;
import admin.worker.dto.WorkerJobRequest;
import admin.worker.dto.WorkerRequest;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WorkerService {

    private static final int ONE = 1;
    private static final int FIRST = 0;
    private final JobRepository jobRepository;
    private final GpuServerRepository serverRepository;
    private final GpuBoardRepository gpuBoardRepository;

    public WorkerService(JobRepository jobRepository,
            GpuServerRepository serverRepository, GpuBoardRepository gpuBoardRepository) {
        this.jobRepository = jobRepository;
        this.serverRepository = serverRepository;
        this.gpuBoardRepository = gpuBoardRepository;
    }

    @Transactional(readOnly = true)
    public JobResponse popJobByServerId(Long serverId) {
        GpuBoard gpuBoard = findGpuBoardByGpuServerId(serverId);
        Long gpuBoardId = gpuBoard.getId();

        return findFirstWaitingJob(gpuBoardId);
    }

    @Transactional
    public void updateJobStatus(Long jobId, WorkerJobRequest workerJobRequest) {
        Job job = findJobById(jobId);
        job.changeStatus(workerJobRequest.getJobStatus());
    }

    @Transactional
    public void updateWorkerStatus(Long serverId, WorkerRequest workerRequest) {
        GpuServer gpuServer = findGpuServerById(serverId);
        gpuServer.changeStatus(workerRequest.getIsOn());
        gpuServer.updateLastResponse(workerRequest.getLastResponse());
    }

    private Job findJobById(Long jobId) {
        return jobRepository.findById(jobId).orElseThrow(JobException.JOB_NOT_FOUND::getException);
    }

    private JobResponse findFirstWaitingJob(Long gpuBoardId) {
        List<Job> jobs = jobRepository.findAllByBoardIdAndStatusOrderById(gpuBoardId, JobStatus.WAITING);

        if (jobs.size() < ONE) {
            throw JobException.NO_WAITING_JOB.getException();
        }
        return JobResponse.of(jobs.get(FIRST));
    }

    private GpuBoard findGpuBoardByGpuServerId(Long serverId) {
        return gpuBoardRepository.findByGpuServerId(serverId)
                .orElseThrow(GpuBoardException.GPU_BOARD_NOT_FOUND::getException);
    }

    private GpuServer findGpuServerById(Long serverId) {
        return serverRepository.findById(serverId)
                .orElseThrow(GpuServerException.GPU_SERVER_NOT_FOUND::getException);
    }
}
