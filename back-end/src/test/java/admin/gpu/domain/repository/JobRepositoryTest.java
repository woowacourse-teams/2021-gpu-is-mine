package admin.gpu.domain.repository;

import admin.gpu.domain.Job;
import admin.gpu.domain.JobStatus;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class JobRepositoryTest {
    @Autowired
    private JobRepository jobs;

    @DisplayName("실행중인 job을 조회")
    @Test
    void findByGpuIdAndWaitingFalse() {
        Optional<Job> runningJob = jobs.findByGpuBoardIdAndStatus(1L, JobStatus.RUNNING);

        assertThat(runningJob.isPresent()).isTrue();
    }

    @DisplayName("대기중인 job을 조회")
    @Test
    void findByGpuIdAndWaitingTrue() {
        List<Job> actual = jobs.findByGpuBoardIdAndStatusOrderByIdAsc(1L, JobStatus.WAITING);

        assertThat(actual).hasSize(2);
        assertThat(actual.get(1).getName()).isEqualTo("예약4");
    }

    @DisplayName("대기중인 job의 갯수를 조회")
    @Test
    void countByGpuIdAndWaitingTrue() {
        Integer actual = jobs.countByGpuBoardIdAndStatus(1L, JobStatus.WAITING);

        assertThat(actual).isEqualTo(2);
    }
}
