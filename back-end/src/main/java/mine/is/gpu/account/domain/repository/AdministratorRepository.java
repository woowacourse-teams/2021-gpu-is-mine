package mine.is.gpu.account.domain.repository;

import java.util.Optional;
import mine.is.gpu.account.domain.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministratorRepository extends JpaRepository<Administrator, Long> {

    boolean existsByEmail(String name);

    Optional<Administrator> findByEmail(String name);
}
