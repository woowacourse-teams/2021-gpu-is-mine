package mine.is.gpu.admin;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministratorRepository extends JpaRepository<Administrator, Long> {

    boolean existsByEmail(String name);

    Optional<Administrator> findByEmail(String name);
}
