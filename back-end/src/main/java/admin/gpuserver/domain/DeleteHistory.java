package admin.gpuserver.domain;

import admin.gpuserver.exception.DeleteHistoryException;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class DeleteHistory extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "gpu_server_id")
    private GpuServer gpuServer;

    protected DeleteHistory() {
    }

    public DeleteHistory(GpuServer gpuServer) {
        validate(gpuServer);
        this.gpuServer = gpuServer;
    }

    private void validate(GpuServer gpuServer) {
        if (Objects.isNull(gpuServer)) {
            throw new DeleteHistoryException("DeleteHistory의 GpuServer 정보는 Null일 수 없습니다.");
        }
    }
}
