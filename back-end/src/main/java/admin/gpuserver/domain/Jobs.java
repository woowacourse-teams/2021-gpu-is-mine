package admin.gpuserver.domain;

import javax.persistence.Embeddable;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Embeddable
public class Jobs {
    @OneToMany(mappedBy = "gpuBoard")
    List<Job> jobs = new ArrayList<>();

    public List<Job> getWaitingJobs() {
        return jobs.stream()
                .filter(job -> job.getStatus() == JobStatus.WAITING)
                .collect(Collectors.toList());
    }

    public List<Job> getJobs() {
        return jobs;
    }
}
