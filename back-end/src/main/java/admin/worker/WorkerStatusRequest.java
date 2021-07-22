package admin.worker;

public class WorkerStatusRequest {
    private Boolean isOn;

    public WorkerStatusRequest() {
    }

    public WorkerStatusRequest(Boolean isOn) {
        this.isOn = isOn;
    }

    public Boolean getIsOn() {
        return isOn;
    }

}
