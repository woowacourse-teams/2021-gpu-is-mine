package mine.is.gpu.member.domain.repository;

import java.util.List;
import java.util.Optional;
import mine.is.gpu.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    List<Member> findAllByLabId(Long labId);

    boolean existsByEmail(String email);
}
