package mine.is.gpu.joblog;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import org.elasticsearch.client.IndicesClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class JobLogRepositoryTest {

    @Autowired
    private JobLogRepository jobLogRepository;

    @Autowired
    private RestHighLevelClient restHighLevelClient;

    @Test
    void findJobId() {
        List<JobLog> jobs = jobLogRepository.findByJobId(29L);
        jobs.stream().map(JobLog::toString).forEach(System.out::println);
        System.out.println(jobs.size());
    }

    @Test
    void test1() {
        IndicesClient indices = restHighLevelClient.indices();

        System.out.println(indices);
    }
}
