package admin.lab.dto;

import admin.lab.domain.Lab;

import java.util.List;
import java.util.stream.Collectors;

public class LabResponses {
    private final List<LabResponse> labResponses;

    public static LabResponses of(List<Lab> labs) {
        return new LabResponses(
                labs.stream()
                        .map(LabResponse::of)
                        .collect(Collectors.toList())
        );
    }

    private LabResponses(List<LabResponse> labResponses) {
        this.labResponses = labResponses;
    }

    public List<LabResponse> getLabResponses() {
        return labResponses;
    }
}
