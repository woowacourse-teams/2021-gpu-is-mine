package mine.is.gpu.joblog;

import java.util.List;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobLogRepository extends ElasticsearchRepository<JobLog, String> {
    @Query("{\"match\": {\"jobId\": {\"query\": \"?0\"}}}")
    List<JobLog> findByJobId(Long jobId);
}
