package admin.gpuserver.domain.repository;

import admin.gpuserver.domain.GpuBoard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GpuBoardRepository extends JpaRepository<GpuBoard, Long> {

    Optional<GpuBoard> findByGpuServerId(Long gpuServerId);
}
