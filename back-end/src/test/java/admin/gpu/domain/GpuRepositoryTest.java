package admin.gpu.domain;


import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class GpuRepositoryTest {
    @Autowired
    private GpuRepository gpus;

    @DisplayName("Gpu로부터 Jobs를 조회한다.")
    @Test
    void getJobs() {
        Gpu actual = gpus.findById(1L).get();
        List<Job> waitingJobs = actual.getWaitingJobs();

        assertThat(waitingJobs).hasSize(2);
    }
}
