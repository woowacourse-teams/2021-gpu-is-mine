package mine.is.gpu.gpuserver.dto.response;

public class GpuServerStatusResponse {

    private Boolean isOn;
    private Boolean isWorking;

    public GpuServerStatusResponse() {
    }

    public GpuServerStatusResponse(Boolean isOn, Boolean isWorking) {
        this.isOn = isOn;
        this.isWorking = isWorking;
    }

    public Boolean getOn() {
        return isOn;
    }

    public Boolean getWorking() {
        return isWorking;
    }
}
