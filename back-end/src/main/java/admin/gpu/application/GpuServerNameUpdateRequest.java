package admin.gpu.application;

public class GpuServerNameUpdateRequest {

    private String name;

    public GpuServerNameUpdateRequest(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
