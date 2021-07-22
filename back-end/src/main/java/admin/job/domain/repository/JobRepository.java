package admin.job.domain.repository;

import admin.job.domain.Job;
import admin.job.dto.response.JobResponses;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findAllByGpuBoardId(Long id);

    Optional<Job> findByIdAndMemberId(Long id, Long memberId);

    List<Job> findAllByMemberId(Long memberId);
}
