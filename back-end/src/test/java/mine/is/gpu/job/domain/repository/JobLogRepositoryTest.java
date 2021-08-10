package mine.is.gpu.job.domain.repository;

import java.util.List;
import mine.is.gpu.job.domain.JobLog;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@Disabled
@SpringBootTest
class JobLogRepositoryTest {

    @Autowired
    private ParsedLogRepository parsedLogRepository;

    @Test
    void findJobId() {
        List<JobLog> jobs = parsedLogRepository.findByJobIdOrderByCurrentEpoch(31L);

        System.out.println(jobs.toString());
        System.out.println(jobs.size());
    }
}