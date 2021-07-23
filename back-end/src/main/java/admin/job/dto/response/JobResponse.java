package admin.job.dto.response;

import admin.job.domain.Job;
import admin.job.domain.JobStatus;
import java.util.List;
import java.util.stream.Collectors;

public class JobResponse {
    private final Long id;
    private final String name;
    private final JobStatus status;

    private JobResponse(Long id, String name, JobStatus status) {
        this.id = id;
        this.name = name;
        this.status = status;
    }

    public static JobResponse of(Job job) {
        return new JobResponse(job.getId(), job.getName(), job.getStatus());
    }

    public static List<JobResponse> listOf(List<Job> jobs) {
        return jobs.stream()
                .map(job -> new JobResponse(job.getId(), job.getName(), job.getStatus()))
                .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public JobStatus getStatus() {
        return status;
    }
}
