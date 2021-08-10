package mine.is.gpu.joblog;

import java.util.List;
import java.util.Optional;
import mine.is.gpu.joblog.JobLog;
import mine.is.gpu.joblog.JobLogRepository;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class JobLogController {
    private JobLogRepository jobLogRepository;

    public JobLogController(JobLogRepository jobLogRepository) {
        this.jobLogRepository = jobLogRepository;
    }

    @GetMapping("/elastic-search/{id}")
    public List<JobLog> findById(@PathVariable Long jobId) {
        List<JobLog> jobLogs = jobLogRepository.findByJobId(jobId);
        return jobLogs;

    }

}
