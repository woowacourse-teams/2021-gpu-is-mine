package mine.is.gpu.job.domain.repository;

import java.util.List;
import mine.is.gpu.job.domain.Log;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRepository extends ElasticsearchRepository<Log, String> {
    List<Log> findByJobIdOrderByTime(Long jobId);
}
