package admin.gpuserver.domain.repository;


import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import admin.gpuserver.domain.Job;
import admin.lab.domain.Lab;
import admin.lab.domain.repository.LabRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class GpuServerRepositoryTest {

    @Autowired
    EntityManager em;

    @Autowired
    private LabRepository labs;

    @Autowired
    private GpuServerRepository gpuServers;

    @Autowired
    private GpuBoardRepository gpuBoards;

    @DisplayName("Gpu를 DB에 저장한다.")
    @Test
    void save() {
        Lab lab = new Lab("better랩");
        labs.save(lab);

        GpuServer gpuServer = new GpuServer("새로운GPU서버1", false, 500L, 1024L, lab);
        GpuBoard gpuBoard = new GpuBoard(true, 1000L, "aab", gpuServer);
        gpuServer.setGpuBoard(gpuBoard);

        gpuServers.save(gpuServer);
        gpuBoards.save(gpuBoard);

        assertThat(lab.getId()).isNotNull();
        assertThat(gpuServer.getId()).isNotNull();
        assertThat(gpuServer.getCreatedAt()).isNotNull();

        em.clear();

        GpuServer persistGpuServer = gpuServers.findById(gpuServer.getId()).orElseThrow(IllegalArgumentException::new);
        assertThat(persistGpuServer.getLab()).isNotNull();
        assertThat(persistGpuServer.getCreatedAt()).isNotNull();
    }

    @DisplayName("Gpu를 삭제한다.")
    @Test
    void delete() {
        Lab lab = new Lab("better랩");
        labs.save(lab);

        GpuServer gpuServer = new GpuServer("새로운GPU서버1", false, 500L, 1024L, lab);
        gpuServers.save(gpuServer);

        Optional<GpuServer> persistGpu = gpuServers.findById(gpuServer.getId());
        assertThat(persistGpu.isPresent()).isTrue();

        gpuServers.delete(gpuServer);

        Optional<GpuServer> actual = gpuServers.findById(gpuServer.getId());
        assertThat(actual.isPresent()).isFalse();
    }
}
