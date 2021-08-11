package mine.is.gpu.gpuserver.domain.repository;

import mine.is.gpu.gpuserver.domain.GpuBoard;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GpuBoardRepository extends JpaRepository<GpuBoard, Long> {
    Optional<GpuBoard> findByGpuServerId(Long gpuServerId);
}
