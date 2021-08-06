package mine.is.gpu.gpuserver.domain.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Optional;
import javax.persistence.EntityManager;
import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.lab.domain.Lab;
import mine.is.gpu.lab.domain.repository.LabRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;

@DataJpaTest
public class GpuServerRepositoryTest {
    @Autowired
    EntityManager em;
    @Autowired
    private LabRepository labRepository;
    @Autowired
    private GpuServerRepository gpuServerRepository;
    @Autowired
    private GpuBoardRepository gpuBoardRepository;

    @DisplayName("Gpu를 DB에 저장한다.")
    @Test
    void save() {
        Lab lab = new Lab("better랩");
        labRepository.save(lab);

        GpuServer gpuServer = new GpuServer("새로운GPU서버1", false, 500L, 1024L, lab);
        GpuBoard gpuBoard = new GpuBoard(true, 1000L, "aab", gpuServer);

        gpuServerRepository.save(gpuServer);
        gpuBoardRepository.save(gpuBoard);

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

    @DisplayName("중복 이름 생성 테스트")
    @Test
    void duplicateName() {
        String name = "GpuServer";

        Lab lab1 = new Lab("lab1");
        labRepository.save(lab1);

        GpuServer gpuServer = new GpuServer(name, false, 500L, 1024L, lab1);
        gpuServerRepository.save(gpuServer);

        Lab lab2 = new Lab("lab2");
        GpuServer gpuServerSameName = new GpuServer(name, true, 1000L, 2000L, lab2);
        assertThrows(DataIntegrityViolationException.class, () -> gpuServerRepository.save(gpuServerSameName));
    }
}
