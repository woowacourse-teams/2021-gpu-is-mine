package admin.gpuserver.domain.repository;

import admin.gpuserver.domain.GpuServer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GpuServerRepository extends JpaRepository<GpuServer, Long> {
    List<GpuServer> findAllByDeletedFalse();

}
