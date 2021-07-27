package admin.gpuserver.domain.repository;

import admin.gpuserver.domain.GpuServer;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GpuServerRepository extends JpaRepository<GpuServer, Long> {
    List<GpuServer> findByLabId(Long labId);
}
