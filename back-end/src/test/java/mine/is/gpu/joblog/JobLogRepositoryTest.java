package mine.is.gpu.joblog;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import org.elasticsearch.client.IndicesClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class JobLogRepositoryTest {

    @Autowired
    private JobLogRepository jobLogRepository;

    @Autowired
    private RestHighLevelClient restHighLevelClient;

    @Test
    void findJobId() {
        List<JobLog> jobs = jobLogRepository.findByJobId(23L);
        System.out.println(jobs.size());
    }

    @Test
    void test1() {
        IndicesClient indices = restHighLevelClient.indices();

        System.out.println(indices);
    }
}