package mine.is.gpu.job.domain.repository;

import java.util.List;
import mine.is.gpu.job.domain.Log;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@Disabled
@SpringBootTest
class LogRepositoryTest {

    @Autowired
    LogRepository logRepository;

    @Test
    void findByJobIdOrderByTime() {
        List<Log> jobs = logRepository.findByJobIdOrderByTime(31L);

        jobs.stream().map(Log::getLog).forEach(System.out::println);
    }
}
