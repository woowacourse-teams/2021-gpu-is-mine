package admin.gpuserver.dto;

import admin.gpuserver.domain.Job;
import java.util.List;

public class JobsResponse {
    private List<JobResponse> jobs;

    public JobsResponse(List<Job> jobs) {

    }
}
