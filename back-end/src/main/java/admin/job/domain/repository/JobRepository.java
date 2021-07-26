package admin.job.domain.repository;

import admin.job.domain.Job;
import admin.job.domain.JobStatus;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findAllByGpuBoardId(Long id);

    Optional<Job> findByIdAndMemberId(Long id, Long memberId);

    @Query("SELECT j FROM Job j WHERE j.gpuBoard.id = :boardId AND j.status = :status ORDER BY j.id ASC")
    List<Job> findAllByBoardIdAndStatusOrderById(Long boardId, JobStatus status);

    List<Job> findAllByMemberId(Long memberId);
}
