package admin.gpu.dto;

import admin.gpu.domain.Job;
import admin.gpu.domain.JobStatus;

import java.util.List;
import java.util.stream.Collectors;

public class JobResponse {
    private final Long id;
    private final String name;
    private final JobStatus status;

    public JobResponse(Long id, String name, JobStatus status) {
        this.id = id;
        this.name = name;
        this.status = status;
    }

    public static List<JobResponse> listOf(List<Job> jobs) {
        return jobs.stream()
                .map(job -> new JobResponse(job.getId(), job.getName(), job.getStatus()))
                .collect(Collectors.toList());
    }
}
