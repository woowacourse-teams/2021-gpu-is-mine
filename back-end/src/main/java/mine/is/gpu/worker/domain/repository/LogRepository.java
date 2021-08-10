package mine.is.gpu.worker.domain.repository;

import java.util.List;
import mine.is.gpu.worker.domain.Log;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogRepository extends JpaRepository<Log, Long> {

    List<Log> findAllByJobId(Long jobId);
}
