package admin.gpu.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {
    Optional<Job> findByGpuBoardIdAndIsWorkingFalse(Long gpuId);

    List<Job> findByGpuBoardIdAndIsWorkingTrueOrderByIdAsc(Long gpuId);

    Integer countByGpuBoardIdAndIsWorkingTrue(Long gpuId);
}
