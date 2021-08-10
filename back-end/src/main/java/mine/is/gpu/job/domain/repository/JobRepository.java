package mine.is.gpu.job.domain.repository;

import java.util.List;
import mine.is.gpu.job.domain.Job;
import mine.is.gpu.job.domain.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findAllByGpuBoardId(Long id);

    List<Job> findAllByGpuBoardIdAndStatus(Long id, JobStatus status);

    List<Job> findAllByMemberId(Long memberId);

    List<Job> findAllByMemberIdAndStatus(Long memberId, JobStatus jobStatus);

    @Query("SELECT j FROM Job j WHERE j.gpuBoard.id = :boardId AND j.status = :status ORDER BY j.id ASC")
    List<Job> findAllByBoardIdAndStatusOrderById(@Param("boardId") Long boardId, @Param("status") JobStatus status);
}
