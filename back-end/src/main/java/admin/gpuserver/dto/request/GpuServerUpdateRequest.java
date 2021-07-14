package admin.gpuserver.dto.request;

public class GpuServerUpdateRequest {

    private String name;

    public GpuServerUpdateRequest() {
    }

    public GpuServerUpdateRequest(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
