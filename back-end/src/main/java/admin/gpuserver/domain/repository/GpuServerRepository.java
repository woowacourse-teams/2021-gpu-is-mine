package admin.gpuserver.domain.repository;

import admin.gpuserver.domain.GpuServer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GpuServerRepository extends JpaRepository<GpuServer, Long> {

}
