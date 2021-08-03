package mine.is.gpu.gpuserver.domain.repository;

import mine.is.gpu.gpuserver.domain.GpuServer;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GpuServerRepository extends JpaRepository<GpuServer, Long> {
    Optional<GpuServer> findByIdAndLabId(Long serverId, Long labId);

    List<GpuServer> findAllByLabId(Long labId);
}
