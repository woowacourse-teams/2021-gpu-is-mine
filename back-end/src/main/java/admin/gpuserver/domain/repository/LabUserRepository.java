package admin.gpuserver.domain.repository;

import admin.gpuserver.domain.LabUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LabUserRepository extends JpaRepository<LabUser, Long> {
}
