package admin.lab.dto;

public class LabRequest {
    private String name;

    public LabRequest() {
    }

    public LabRequest(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
