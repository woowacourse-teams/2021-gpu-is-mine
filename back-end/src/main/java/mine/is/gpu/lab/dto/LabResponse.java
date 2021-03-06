package mine.is.gpu.lab.dto;

import mine.is.gpu.lab.domain.Lab;

public class LabResponse {
    private Long id;
    private String name;

    public LabResponse() {
    }

    private LabResponse(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public static LabResponse of(Lab lab) {
        return new LabResponse(lab.getId(), lab.getName());
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
