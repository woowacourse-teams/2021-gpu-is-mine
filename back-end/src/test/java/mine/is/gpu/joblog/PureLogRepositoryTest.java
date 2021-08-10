package mine.is.gpu.joblog;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class PureLogRepositoryTest {

    @Autowired PureLogRepository pureLogRepository;

    @Test
    void findByJobIdOrderByTime() {
        List<PureLog> jobs = pureLogRepository.findByJobIdOrderByTime(31L);

        jobs.stream().map(PureLog::getLog).forEach(System.out::println);
    }
}
