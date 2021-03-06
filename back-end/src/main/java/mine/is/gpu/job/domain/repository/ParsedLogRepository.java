package mine.is.gpu.job.domain.repository;

import java.util.List;
import mine.is.gpu.job.domain.ParsedLog;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParsedLogRepository extends ElasticsearchRepository<ParsedLog, String> {
    List<ParsedLog> findByJobIdOrderByCurrentEpoch(Long jobId);
}
