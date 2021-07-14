package admin.gpuserver.domain;

import admin.gpuserver.exception.GpuServerServiceException;

import javax.persistence.*;

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
        if (gpuServer == null) {
            throw new GpuServerServiceException("객체를 생성할 수 없습니다.");
        }
    }
}
