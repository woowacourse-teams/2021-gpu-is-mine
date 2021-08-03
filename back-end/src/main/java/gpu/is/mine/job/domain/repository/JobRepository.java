package gpu.is.mine.job.domain.repository;

import gpu.is.mine.job.domain.Job;
import gpu.is.mine.job.domain.JobStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findAllByGpuBoardId(Long id);

    List<Job> findAllByGpuBoardIdAndStatus(Long id, JobStatus status);

    List<Job> findAllByMemberId(Long memberId);

    List<Job> findAllByMemberIdAndStatus(Long memberId, JobStatus jobStatus);

    @Query("SELECT j FROM Job j WHERE j.gpuBoard.id = :boardId AND j.status = :status ORDER BY j.id ASC")
    List<Job> findAllByBoardIdAndStatusOrderById(Long boardId, JobStatus status);
}
