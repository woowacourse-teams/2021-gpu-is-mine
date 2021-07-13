package admin.gpuserver.domain.repository;

import admin.gpuserver.domain.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findAllByGpuBoardId(Long id);
}
