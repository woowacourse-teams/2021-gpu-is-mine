package mine.is.gpu.job.domain.repository;

import java.util.List;
import mine.is.gpu.job.domain.PureLog;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PureLogRepository extends ElasticsearchRepository<PureLog, String> {
    List<PureLog> findByJobIdOrderByTime(Long jobId);
}
