package mine.is.gpu.lab.domain.repository;

import mine.is.gpu.lab.domain.Lab;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LabRepository extends JpaRepository<Lab, Long> {
    boolean existsByName(String name);
}
