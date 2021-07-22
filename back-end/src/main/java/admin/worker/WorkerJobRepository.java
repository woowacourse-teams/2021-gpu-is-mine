package admin.worker;

import admin.job.domain.Job;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkerJobRepository extends JpaRepository<Job, Long> {
    @Query("SELECT j FROM Job j WHERE j.gpuBoard.id = :#{#boardId} ORDER BY j.id ASC NULLS FIRST")
    List<Job> findAllByBoardIdByOrderById(@Param("boardId") Long boardId);
}
