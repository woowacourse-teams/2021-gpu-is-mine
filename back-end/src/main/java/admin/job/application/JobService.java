package admin.job.application;

import admin.gpuserver.domain.GpuBoard;
import admin.job.domain.Job;
import admin.gpuserver.domain.LabUser;
import admin.gpuserver.domain.repository.GpuBoardRepository;
import admin.job.domain.repository.JobRepository;
import admin.gpuserver.domain.repository.LabUserRepository;
import admin.job.dto.request.JobRequest;
import admin.job.dto.response.JobResponse;
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
        Job job = findJobById(jobId);

        return JobResponse.of(job);
    }

    @Transactional
    public void cancel(Long labUserId, Long jobId) {
        Job job = jobRepository.findByIdAndLabUserId(jobId, labUserId)
                .orElseThrow(() -> new IllegalArgumentException("job 이 없습니다."));

        GpuBoard gpuBoard = job.getGpuBoard();
        gpuBoard.cancel(job);
    }

    private Job findJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("job 이 없습니다."));
    }
}
