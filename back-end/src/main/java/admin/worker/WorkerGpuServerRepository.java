package admin.worker;

import admin.gpuserver.domain.GpuServer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkerGpuServerRepository extends JpaRepository<GpuServer, Long> {
}
