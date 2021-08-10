package mine.is.gpu.gpuserver.domain.repository;

import java.util.Optional;
import mine.is.gpu.gpuserver.domain.GpuBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GpuBoardRepository extends JpaRepository<GpuBoard, Long> {
    Optional<GpuBoard> findByGpuServerId(Long gpuServerId);
}
