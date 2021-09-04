package mine.is.gpu.job.dto.response;

import java.util.List;
import java.util.stream.Collectors;
import mine.is.gpu.job.domain.Job;
import mine.is.gpu.job.domain.JobStatus;

public class JobMainPageResponse {
    private Long id;
    private String name;
    private JobStatus status;
    private Long memberId;

    private JobMainPageResponse(Long id, String name, JobStatus status, Long memberId) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.memberId = memberId;
    }

    public static JobMainPageResponse of(Job job) {
        return new JobMainPageResponse(job.getId(), job.getName(), job.getStatus(), job.getMember().getId());
    }

    public static List<JobMainPageResponse> listOf(List<Job> jobs) {
        return jobs.stream()
                .map(JobMainPageResponse::of)
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

    public Long getMemberId() {
        return memberId;
    }
}
