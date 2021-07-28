package admin.job.domain;

public enum JobStatus {
    WAITING, RUNNING, COMPLETED, CANCELED;

    public boolean isWaiting() {
        return this.equals(WAITING);
    }

    public boolean isRunning() {
        return this.equals(RUNNING);
    }
}
