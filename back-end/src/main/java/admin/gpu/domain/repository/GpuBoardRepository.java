package admin.gpu.domain.repository;

import admin.gpu.domain.GpuBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GpuBoardRepository extends JpaRepository<GpuBoard, Long> {
}
