package admin.gpu.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {
    Optional<Job> findByGpuIdAndWaitingFalse(Long gpuId);

    List<Job> findByGpuIdAndWaitingTrueOrderByIdAsc(Long gpuId);

    Integer countByGpuIdAndWaitingTrue(Long gpuId);
}
