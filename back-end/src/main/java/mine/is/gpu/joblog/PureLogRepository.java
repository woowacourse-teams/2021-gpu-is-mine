package mine.is.gpu.joblog;

import java.util.List;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PureLogRepository extends ElasticsearchRepository<PureLog, String> {
    List<PureLog> findByJobIdOrderByTime(Long jobId);
}
