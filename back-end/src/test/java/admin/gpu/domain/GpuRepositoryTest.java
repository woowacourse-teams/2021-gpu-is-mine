package admin.gpu.domain;


import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class GpuRepositoryTest {
    @Autowired
    private LabRepository labs;
    @Autowired
    private GpuRepository gpus;

    @Autowired
    EntityManager em;

    @DisplayName("Gpu로부터 Jobs를 조회한다.")
    @Test
    void getJobs() {
        Gpu actual = gpus.findById(1L).get();
        List<Job> waitingJobs = actual.getWaitingJobs();

        assertThat(waitingJobs).hasSize(2);
    }

    @DisplayName("Gpu를 DB에 저장한다.")
    @Test
    void save() {
        Lab lab = new Lab("better랩");
        labs.save(lab);
        Gpu gpu = new Gpu("새로운GPU1", "nvidia", false, 500, 1024, 1000, lab);

        gpus.save(gpu);

        assertThat(lab.getId()).isNotNull();
        assertThat(gpu.getId()).isNotNull();

        em.clear();

        Gpu persistGpu = gpus.findById(lab.getId()).get();
        assertThat(persistGpu.getLab()).isNotNull();
    }

    @DisplayName("Gpu를 삭제한다.")
    @Test
    void delete() {
        Lab lab = new Lab("better랩");
        labs.save(lab);
        Gpu gpu = new Gpu("새로운GPU1", "nvidia", false, 500, 1024, 1000, lab);
        gpus.save(gpu);

        Optional<Gpu> persistGpu = gpus.findById(gpu.getId());
        assertThat(persistGpu.isPresent()).isTrue();

        gpus.delete(gpu);

        Optional<Gpu> actual = gpus.findById(gpu.getId());
        assertThat(actual.isPresent()).isFalse();
    }
}
