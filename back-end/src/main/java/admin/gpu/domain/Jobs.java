package admin.gpu.domain;

import javax.persistence.Embeddable;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Embeddable
public class Jobs {
    @OneToMany(mappedBy = "gpu")
    List<Job> jobs = new ArrayList<>();

    public List<Job> getWaitingJobs() {
        List<Job> waitingJobs = jobs.stream()
                .filter(job -> job.isWaiting())
                .collect(Collectors.toList());
        return waitingJobs;
    }
}
