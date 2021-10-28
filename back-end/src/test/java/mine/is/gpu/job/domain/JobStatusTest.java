package mine.is.gpu.job.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import mine.is.gpu.job.exception.JobException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class JobStatusTest {
    @ParameterizedTest
    @ValueSource(strings = {"not", "existing", " "})
    @DisplayName("존재하지 않는 Enum으로의 요청 에러 발생")
    void notExistingValueOf(String input) {
        assertThatThrownBy(() -> JobStatus.ignoreCaseValueOf(input))
                .isEqualTo(JobException.NOT_EXISTING_JOB_STATUS.getException());
    }

    @ParameterizedTest
    @ValueSource(strings = {"running", "Running", "RUNNING"})
    @DisplayName("Enum: RUNNING")
    void runningValueOf(String input) {
        JobStatus jobStatus = JobStatus.ignoreCaseValueOf(input);
        assertThat(jobStatus).isEqualTo(JobStatus.RUNNING);
    }

    @ParameterizedTest
    @ValueSource(strings = {"waiting", "Waiting", "WAITING"})
    @DisplayName("Enum: WAITING")
    void waitingValueOf(String input) {
        JobStatus jobStatus = JobStatus.ignoreCaseValueOf(input);
        assertThat(jobStatus).isEqualTo(JobStatus.WAITING);
    }

    @ParameterizedTest
    @ValueSource(strings = {"completed", "Completed", "COMPLETED"})
    @DisplayName("Enum: COMPLETED")
    void completedValueOf(String input) {
        JobStatus jobStatus = JobStatus.ignoreCaseValueOf(input);
        assertThat(jobStatus).isEqualTo(JobStatus.COMPLETED);
    }

    @ParameterizedTest
    @ValueSource(strings = {"canceled", "Canceled", "CANCELED"})
    @DisplayName("Enum: CANCELED")
    void canceledValueOf(String input) {
        JobStatus jobStatus = JobStatus.ignoreCaseValueOf(input);
        assertThat(jobStatus).isEqualTo(JobStatus.CANCELED);
    }

    @ParameterizedTest
    @ValueSource(strings = {"failed", "Failed", "FAILED"})
    @DisplayName("Enum: FAILED")
    void failedValueOf(String input) {
        JobStatus jobStatus = JobStatus.ignoreCaseValueOf(input);
        assertThat(jobStatus).isEqualTo(JobStatus.FAILED);
    }
}
