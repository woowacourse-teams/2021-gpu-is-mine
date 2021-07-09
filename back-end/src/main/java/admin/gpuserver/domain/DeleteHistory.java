package admin.gpuserver.domain;

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
        this.gpuServer = gpuServer;
    }
}
