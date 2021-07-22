package admin.worker;

import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import admin.gpuserver.domain.repository.GpuBoardRepository;
import admin.gpuserver.exception.GpuBoardException;
import admin.gpuserver.exception.GpuServerException;
import admin.job.domain.Job;
import admin.job.domain.JobStatus;
import admin.job.dto.response.JobResponse;
import admin.job.exception.JobException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WorkerJobService {

    private final WorkerJobRepository jobRepository;
    private final WorkerGpuServerRepository serverRepository;
    private final GpuBoardRepository gpuBoardRepository;

    public WorkerJobService(WorkerJobRepository jobRepository, WorkerGpuServerRepository serverRepository,
            GpuBoardRepository gpuBoardRepository) {
        this.jobRepository = jobRepository;
        this.serverRepository = serverRepository;
        this.gpuBoardRepository = gpuBoardRepository;
    }

    public JobResponse popJobByServerId(Long serverId) {
        GpuBoard gpuBoard = gpuBoardRepository.findByGpuServerId(serverId)
                .orElseThrow(GpuBoardException.GPU_BOARD_NOT_FOUND::getException);
        Long gpuBoardId = gpuBoard.getId();
        List<Job> jobs = jobRepository.findAllByBoardIdAndStatusByOrderById(gpuBoardId, JobStatus.WAITING);

        if (jobs.size() > 1) {
            return JobResponse.of(jobs.get(0));
        }
        throw JobException.JOB_NOT_FOUND.getException();
    }

    @Transactional
    public void updateWorkerStatus(Long serverId, Boolean isOn) {
        GpuServer gpuServer = serverRepository.findById(serverId)
                .orElseThrow(GpuServerException.GPU_SERVER_NOT_FOUND::getException);
        gpuServer.changeStatus(isOn);
    }
}
