package admin.gpuserver.domain.repository;

import admin.gpuserver.domain.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
}
