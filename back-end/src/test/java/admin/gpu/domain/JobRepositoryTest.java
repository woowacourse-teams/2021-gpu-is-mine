package admin.gpu.domain;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class JobRepositoryTest {
    @Autowired
    private JobRepository jobs;

    @Test
    void findByGpuIdAndWaitingFalse() {
        Optional<Job> runningJob = jobs.findByGpuIdAndWaitingFalse(1L);

        assertThat(runningJob.isPresent()).isTrue();
    }

    @Test
    void findByGpuIdAndWaitingTrue() {
    }

    @Test
    void countByGpuIdAndWaitingTrue() {
    }
}