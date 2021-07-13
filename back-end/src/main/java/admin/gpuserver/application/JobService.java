package admin.gpuserver.application;

import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.Job;
import admin.gpuserver.domain.LabUser;
import admin.gpuserver.domain.repository.GpuBoardRepository;
import admin.gpuserver.domain.repository.JobRepository;
import admin.gpuserver.domain.repository.LabUserRepository;
import admin.gpuserver.dto.request.JobRequest;
import admin.gpuserver.dto.response.JobResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class JobService {

    private JobRepository jobRepository;
    private GpuBoardRepository gpuBoardRepository;
    private LabUserRepository labUserRepository;

    public JobService(JobRepository jobRepository, GpuBoardRepository gpuBoardRepository, LabUserRepository labUserRepository) {
        this.jobRepository = jobRepository;
        this.gpuBoardRepository = gpuBoardRepository;
        this.labUserRepository = labUserRepository;
    }

    @Transactional
    public Long insert(Long labUserId, JobRequest jobRequest) {
        GpuBoard gpuBoard = gpuBoardRepository.findByGpuServerId(jobRequest.getGpuServerId())
                .orElseThrow(() -> new IllegalArgumentException("board 가 없습니다."));

        LabUser labUser = labUserRepository.findById(labUserId)
                .orElseThrow(() -> new IllegalArgumentException("user 가 없습니다."));

        Job newJob = jobRepository.save(new Job(jobRequest.getName(), gpuBoard, labUser));
        gpuBoard.addJob(newJob);

        return newJob.getId();
    }

    @Transactional(readOnly = true)
    public JobResponse findById(Long jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("job 이 없습니다."));

        return JobResponse.of(job);
    }

    @Transactional
    public void cancel(Long labUserId, Long jobId) {
        Job job = jobRepository.findByIdAndUserId(jobId, labUserId)
                .orElseThrow(() -> new IllegalArgumentException("job 이 없습니다."));

        GpuBoard gpuBoard = job.getGpuBoard();
        gpuBoard.cancel(job);
    }

    @Transactional
    public void complete(Long jobId) {
        Job completedJob = jobRepository.findById(jobId)
                .orElseThrow(() -> new IllegalArgumentException("job 이 없습니다."));

        GpuBoard gpuBoard = completedJob.getGpuBoard();
        gpuBoard.complete(completedJob);

        // TODO :: MAIL SERVICE
    }
}
