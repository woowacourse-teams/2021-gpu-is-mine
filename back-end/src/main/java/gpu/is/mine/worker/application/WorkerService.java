package gpu.is.mine.worker.application;

import gpu.is.mine.gpuserver.domain.GpuBoard;
import gpu.is.mine.gpuserver.domain.GpuServer;
import gpu.is.mine.gpuserver.domain.repository.GpuBoardRepository;
import gpu.is.mine.gpuserver.domain.repository.GpuServerRepository;
import gpu.is.mine.gpuserver.exception.GpuBoardException;
import gpu.is.mine.gpuserver.exception.GpuServerException;
import gpu.is.mine.job.domain.Job;
import gpu.is.mine.job.domain.JobStatus;
import gpu.is.mine.job.domain.repository.JobRepository;
import gpu.is.mine.job.dto.response.JobResponse;
import gpu.is.mine.job.exception.JobException;
import gpu.is.mine.worker.domain.Log;
import gpu.is.mine.worker.domain.repository.LogRepository;
import gpu.is.mine.worker.dto.WorkerJobLogRequest;
import gpu.is.mine.worker.dto.WorkerJobRequest;
import gpu.is.mine.worker.dto.WorkerRequest;
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
    private final LogRepository logRepository;

    public WorkerService(JobRepository jobRepository,
            GpuServerRepository serverRepository,
            GpuBoardRepository gpuBoardRepository,
            LogRepository logRepository) {
        this.jobRepository = jobRepository;
        this.serverRepository = serverRepository;
        this.gpuBoardRepository = gpuBoardRepository;
        this.logRepository = logRepository;
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
    public Long saveLog(Long jobId, WorkerJobLogRequest workerJobLogRequest) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(JobException.JOB_NOT_FOUND::getException);
        Log log = new Log(workerJobLogRequest.getContent(), job);
        logRepository.save(log);
        return log.getId();
    }

    @Transactional
    public void start(Long jobId) {
        Job job = findJobById(jobId);
        if (job.getStatus() != JobStatus.WAITING) {
            throw new IllegalArgumentException();
        }
        job.changeStatus(JobStatus.RUNNING);
    }

    @Transactional
    public void end(Long jobId) {
        Job job = findJobById(jobId);
        if (job.getStatus() != JobStatus.RUNNING) {
            throw new IllegalArgumentException();
        }
        job.changeStatus(JobStatus.COMPLETED);
    }
}
