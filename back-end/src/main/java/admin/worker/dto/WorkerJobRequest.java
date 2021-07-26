package admin.worker.dto;

import admin.job.domain.JobStatus;

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
