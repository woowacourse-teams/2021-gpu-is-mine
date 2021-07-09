package admin.gpu.domain.repository;

import admin.gpu.domain.LabUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LabUserRepository extends JpaRepository<LabUser, Long> {
}
