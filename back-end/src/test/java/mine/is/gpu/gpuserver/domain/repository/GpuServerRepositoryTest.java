package mine.is.gpu.gpuserver.domain.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

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

    @DisplayName("Pageable를 파라미터로 GpuServer 정보를 가져온다")
    @Test
    void findAllByLabId() {
        Lab lab = new Lab("lab");
        labRepository.save(lab);

        String baseName = "server";
        IntStream.range(0, 30)
                .mapToObj(i -> new GpuServer(baseName + i, false, 500L, 1024L, lab))
                .forEach(gpuServer -> gpuServerRepository.save(gpuServer));

        Pageable pageable = PageRequest.of(2, 3);

        List<String> searchedNames = gpuServerRepository.findAllByLabId(lab.getId(), pageable).stream()
                .map(GpuServer::getName)
                .collect(Collectors.toList());

        List<String> expectedNames = IntStream.range(0, pageable.getPageSize())
                .mapToObj(i -> baseName + (pageable.getPageSize() * pageable.getPageNumber() + i))
                .collect(Collectors.toList());

        assertThat(expectedNames).isEqualTo(searchedNames);
    }

    @DisplayName("Pageable이 null인 경우 모든 결과를 반환한다.")
    @Test
    void findAllByLabIdWithNullPageable() {
        Lab lab = new Lab("lab");
        labRepository.save(lab);

        String baseName = "server";

        List<String> names = IntStream.range(0, 30)
                .mapToObj(i -> baseName + i)
                .collect(Collectors.toList());

        names.forEach(name -> gpuServerRepository.save(new GpuServer(name, false, 500L, 1024L, lab)));

        List<String> searchedNames = gpuServerRepository.findAllByLabId(lab.getId(), null).stream()
                .map(GpuServer::getName)
                .collect(Collectors.toList());

        assertThat(names).isEqualTo(searchedNames);
    }
}
