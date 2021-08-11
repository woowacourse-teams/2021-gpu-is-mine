package mine.is.gpu.job.dto.response;

import java.util.ArrayList;
import java.util.List;
import mine.is.gpu.job.domain.CalculatedTime;
import mine.is.gpu.job.domain.Job;

public class JobResponses {
    private List<JobResponse> jobResponses;

    private JobResponses() {
    }

    private JobResponses(List<JobResponse> jobResponses) {
        this.jobResponses = jobResponses;
    }

    public static JobResponses of(List<Job> jobs) {
        Long usageTime = 0L;
        List<JobResponse> jobResponses = new ArrayList<>();

        for (Job job : jobs) {
            jobResponses.add(JobResponse.of(job, new CalculatedTime(job, usageTime, job.getExpectedTime())));
            usageTime += Integer.parseInt(job.getExpectedTime());
        }

        return new JobResponses(jobResponses);
    }

    public List<JobResponse> getJobResponses() {
        return jobResponses;
    }
}
