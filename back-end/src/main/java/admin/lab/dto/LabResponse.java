package admin.lab.dto;

import admin.lab.domain.Lab;

public class LabResponse {
    private final Long id;
    private final String name;

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
