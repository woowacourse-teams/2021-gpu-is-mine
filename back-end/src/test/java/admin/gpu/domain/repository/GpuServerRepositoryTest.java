package admin.gpu.domain.repository;


import admin.gpu.domain.GpuBoard;
import admin.gpu.domain.GpuServer;
import admin.gpu.domain.Job;
import admin.gpu.domain.Lab;
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

    @DisplayName("Gpu로부터 Jobs를 조회한다.")
    @Test
    void getJobs() {
        GpuServer actual = gpuServers.findById(1L).get();
        List<Job> waitingJobs = actual.getWaitingJobs();

        assertThat(waitingJobs).hasSize(2);
    }

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

        GpuServer persistGpuServer = gpuServers.findById(gpuServer.getId()).get();
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
