package admin.member.dto.request;

public class ChangeLabRequest {
    private Long labId;

    public ChangeLabRequest() {
    }

    public ChangeLabRequest(Long labId) {
        this.labId = labId;
    }

    public Long getLabId() {
        return labId;
    }
}
