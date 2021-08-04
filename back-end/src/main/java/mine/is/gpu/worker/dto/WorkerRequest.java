package mine.is.gpu.worker.dto;

import java.time.LocalDateTime;

public class WorkerRequest {
    private Boolean isOn;
    private LocalDateTime lastResponse;

    public WorkerRequest() {
    }

    public WorkerRequest(Boolean isOn, LocalDateTime lastResponse) {
        this.isOn = isOn;
        this.lastResponse = lastResponse;
    }

    public Boolean getIsOn() {
        return isOn;
    }

    public LocalDateTime getLastResponse() {
        return lastResponse;
    }
}
