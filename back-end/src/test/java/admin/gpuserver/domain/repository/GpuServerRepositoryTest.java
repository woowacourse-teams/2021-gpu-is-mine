package admin.gpuserver.domain.repository;

import static org.assertj.core.api.Assertions.assertThat;

import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import admin.lab.domain.Lab;
import admin.lab.domain.repository.LabRepository;
import java.util.Optional;
import javax.persistence.EntityManager;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class GpuServerRepositoryTest {

    @Autowired
    EntityManager em;

    @Autowired
    private LabRepository labRepository;

    @Autowired
    private GpuServerRepository gpuServerRepository;

    @Autowired
    private GpuBoardRepository gpuBoards;

    @DisplayName("Gpu를 DB에 저장한다.")
    @Test
    void save() {
        Lab lab = new Lab("better랩");
        labRepository.save(lab);

        GpuServer gpuServer = new GpuServer("새로운GPU서버1", false, 500L, 1024L, lab);
        GpuBoard gpuBoard = new GpuBoard(true, 1000L, "aab", gpuServer);

        gpuServerRepository.save(gpuServer);
        gpuBoards.save(gpuBoard);

        assertThat(lab.getId()).isNotNull();
        assertThat(gpuServer.getId()).isNotNull();
        assertThat(gpuServer.getCreatedAt()).isNotNull();

        em.clear();

        GpuServer persistGpuServer = gpuServerRepository.findById(gpuServer.getId())
                .orElseThrow(IllegalArgumentException::new);
        Assertions.assertThat(persistGpuServer.getLab()).isNotNull();
        assertThat(persistGpuServer.getCreatedAt()).isNotNull();
    }

    @DisplayName("Gpu를 삭제한다.")
    @Test
    void delete() {
        Lab lab = new Lab("better랩");
        labRepository.save(lab);

        GpuServer gpuServer = new GpuServer("새로운GPU서버1", false, 500L, 1024L, lab);
        gpuServerRepository.save(gpuServer);

        Optional<GpuServer> persistGpu = gpuServerRepository.findById(gpuServer.getId());
        assertThat(persistGpu.isPresent()).isTrue();

        gpuServerRepository.delete(gpuServer);

        Optional<GpuServer> actual = gpuServerRepository.findById(gpuServer.getId());
        assertThat(actual.isPresent()).isFalse();
    }
}
