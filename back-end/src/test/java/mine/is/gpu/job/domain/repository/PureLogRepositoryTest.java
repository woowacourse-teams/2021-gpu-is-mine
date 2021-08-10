package mine.is.gpu.job.domain.repository;

import java.util.List;
import mine.is.gpu.job.domain.PureLog;
import mine.is.gpu.job.domain.repository.PureLogRepository;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@Disabled
@SpringBootTest
class PureLogRepositoryTest {

    @Autowired
    PureLogRepository pureLogRepository;

    @Test
    void findByJobIdOrderByTime() {
        List<PureLog> jobs = pureLogRepository.findByJobIdOrderByTime(31L);

        jobs.stream().map(PureLog::getLog).forEach(System.out::println);
    }
}
