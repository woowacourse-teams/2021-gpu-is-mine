package admin.gpu.domain.repository;

import admin.gpu.domain.DeleteHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeleteHistoryRepository extends JpaRepository<DeleteHistory, Long> {
}
