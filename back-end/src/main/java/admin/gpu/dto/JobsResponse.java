package admin.gpu.dto;

import admin.gpu.domain.Job;

import java.util.List;

public class JobsResponse {
    private List<JobResponse> jobs;

    public JobsResponse(List<Job> jobs) {

    }
}
