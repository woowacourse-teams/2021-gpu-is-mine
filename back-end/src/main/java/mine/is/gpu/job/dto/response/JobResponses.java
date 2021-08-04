package mine.is.gpu.job.dto.response;

import mine.is.gpu.job.domain.Job;
import java.util.List;
import java.util.stream.Collectors;

public class JobResponses {

    private List<JobResponse> jobResponses;

    private JobResponses(List<JobResponse> jobResponses) {
        this.jobResponses = jobResponses;
    }

    public JobResponses() {
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
