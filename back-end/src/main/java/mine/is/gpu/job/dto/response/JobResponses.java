package mine.is.gpu.job.dto.response;

import java.util.List;
import java.util.stream.Collectors;
import mine.is.gpu.job.domain.Job;

public class JobResponses {
    private List<JobResponse> jobResponses;

    public JobResponses() {
    }

    private JobResponses(List<JobResponse> jobResponses) {
        this.jobResponses = jobResponses;
    }

    public static JobResponses of(List<Job> jobs) {
        List<JobResponse> jobResponses = jobs.stream()
                .map(JobResponse::of)
                .collect(Collectors.toList());

        return new JobResponses(jobResponses);
    }

    public List<JobResponse> getJobResponses() {
        return jobResponses;
    }
}
