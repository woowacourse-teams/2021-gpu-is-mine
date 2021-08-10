package mine.is.gpu.job.domain.repository;

import java.util.List;
import mine.is.gpu.job.domain.JobLog;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParsedLogRepository extends ElasticsearchRepository<JobLog, String> {
    List<JobLog> findByJobIdOrderByCurrentEpoch(Long jobId);
}
