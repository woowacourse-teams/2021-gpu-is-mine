package mine.is.gpu.worker.application;

import java.util.List;
import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.gpuserver.domain.repository.GpuBoardRepository;
import mine.is.gpu.gpuserver.domain.repository.GpuServerRepository;
import mine.is.gpu.gpuserver.exception.GpuBoardException;
import mine.is.gpu.gpuserver.exception.GpuServerException;
import mine.is.gpu.job.domain.Job;
import mine.is.gpu.job.domain.JobStatus;
import mine.is.gpu.job.domain.repository.JobRepository;
import mine.is.gpu.job.dto.response.JobResponse;
import mine.is.gpu.job.exception.JobException;
import mine.is.gpu.worker.dto.WorkerJobRequest;
import mine.is.gpu.worker.dto.WorkerRequest;
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
                         GpuServerRepository serverRepository,
                         GpuBoardRepository gpuBoardRepository) {
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
        if (workerJobRequest.getJobStatus().isRunning()) {
            job.start();
        }
        if (workerJobRequest.getJobStatus().isCompleted()) {
            job.complete();
        }
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
        List<Job> jobs = jobRepository
                .findAllByBoardIdAndStatusOrderById(gpuBoardId, JobStatus.WAITING);
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

    @Transactional
    public void start(Long jobId) {
        Job job = findJobById(jobId);
        job.start();
    }

    @Transactional
    public void end(Long jobId) {
        Job job = findJobById(jobId);
        job.complete();
    }
}
