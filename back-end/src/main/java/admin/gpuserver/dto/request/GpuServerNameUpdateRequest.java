package admin.gpuserver.dto.request;

public class GpuServerNameUpdateRequest {

    private String name;

    public GpuServerNameUpdateRequest() {
    }

    public GpuServerNameUpdateRequest(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
