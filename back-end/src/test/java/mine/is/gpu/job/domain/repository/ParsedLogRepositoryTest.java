package mine.is.gpu.job.domain.repository;

import java.util.List;
import mine.is.gpu.job.domain.ParsedLog;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@Disabled
@ActiveProfiles("test")
@SpringBootTest
class ParsedLogRepositoryTest {

    @Autowired
    private ParsedLogRepository parsedLogRepository;

    @Test
    void findJobId() {
        List<ParsedLog> jobs = parsedLogRepository.findByJobIdOrderByCurrentEpoch(31L);

        System.out.println(jobs.toString());
        System.out.println(jobs.size());
    }
}
