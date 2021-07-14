package admin.member.dto.request;

public class ChangeLabRequest {
    Long changeLabId;

    public ChangeLabRequest() {
    }

    public ChangeLabRequest(Long changeLabId) {
        this.changeLabId = changeLabId;
    }

    public Long getLabId() {
        return changeLabId;
    }
}
