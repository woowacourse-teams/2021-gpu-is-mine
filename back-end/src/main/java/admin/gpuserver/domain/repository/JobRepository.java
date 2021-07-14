package admin.gpuserver.domain.repository;

import admin.gpuserver.domain.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findAllByGpuBoardId(Long id);

    Optional<Job> findByIdAndLabUserId(Long id, Long userId);
}
