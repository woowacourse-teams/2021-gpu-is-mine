package admin.worker;

import admin.job.domain.Job;
import admin.job.domain.JobStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkerJobRepository extends JpaRepository<Job, Long> {
    @Query("SELECT j FROM Job j WHERE j.gpuBoard.id = :#{#boardId} AND j.status = :#{#status} ORDER BY j.id ASC")
    List<Job> findAllByBoardIdAndStatusByOrderById(@Param("boardId") Long boardId, @Param("status")JobStatus status);
}
