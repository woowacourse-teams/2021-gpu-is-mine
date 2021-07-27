package admin.job.domain;

import admin.job.exception.JobException;
import java.util.Locale;

public enum JobStatus {
    WAITING, RUNNING, COMPLETED, CANCELED;

    public static JobStatus ignoreCaseValueOf(String input) {
        try {
            return JobStatus.valueOf(input.toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException e) {
            throw JobException.NOT_EXISTING_JOB_STATUS.getException();
        }
    }

    public boolean isWaiting() {
        return this.equals(WAITING);
    }
}
