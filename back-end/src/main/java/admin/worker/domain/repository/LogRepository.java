package admin.worker.domain.repository;

import admin.worker.domain.Log;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogRepository extends JpaRepository<Log, Long> {

    List<Log> findAllByJobId(Long jobId);
}
