package gpu.is.mine.worker.dto;

import gpu.is.mine.job.domain.JobStatus;

public class WorkerJobRequest {
    private JobStatus jobStatus;

    public WorkerJobRequest() {
    }

    public WorkerJobRequest(JobStatus jobStatus) {
        this.jobStatus = jobStatus;
    }

    public JobStatus getJobStatus() {
        return jobStatus;
    }
}
