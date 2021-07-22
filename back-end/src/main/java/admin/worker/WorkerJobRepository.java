package admin.worker;

import admin.job.domain.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkerJobRepository extends JpaRepository<Job, Long> {
    Job findOneByServerId(Long serverId);
}
