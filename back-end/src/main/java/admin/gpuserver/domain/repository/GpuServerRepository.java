package admin.gpuserver.domain.repository;

import admin.gpuserver.domain.GpuServer;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GpuServerRepository extends JpaRepository<GpuServer, Long> {
    List<GpuServer> findAllByDeletedFalse();

    Optional<GpuServer> findByIdAndDeletedFalse(Long gpuServerId);

    List<GpuServer> findByLabId(Long labId);

    List<GpuServer> findByLabIdAndDeletedFalse(Long labId);
}
