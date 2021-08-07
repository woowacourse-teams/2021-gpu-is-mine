package mine.is.gpu.lab.dto;

import java.util.List;
import java.util.stream.Collectors;
import mine.is.gpu.lab.domain.Lab;

public class LabResponses {
    private List<LabResponse> labResponses;

    public LabResponses() {
    }

    private LabResponses(List<LabResponse> labResponses) {
        this.labResponses = labResponses;
    }

    public static LabResponses of(List<Lab> labs) {
        return new LabResponses(
                labs.stream()
                        .map(LabResponse::of)
                        .collect(Collectors.toList())
        );
    }

    public List<LabResponse> getLabResponses() {
        return labResponses;
    }
}
