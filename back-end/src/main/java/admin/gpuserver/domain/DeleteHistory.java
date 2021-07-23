package admin.gpuserver.domain;

import admin.gpuserver.exception.DeleteHistoryException;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

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
            throw DeleteHistoryException.INVALID_GPU_SERVER_ID.getException();
        }
    }
}
