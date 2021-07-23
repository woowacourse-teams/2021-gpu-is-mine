package admin.gpuserver.domain;

import admin.gpuserver.exception.GpuBoardException;
import admin.job.domain.Job;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class GpuBoard extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Boolean isWorking;
    private Long performance;
    private String modelName;

    @OneToOne
    @JoinColumn(name = "gpu_server_id")
    private GpuServer gpuServer;

    protected GpuBoard() {
    }

    public GpuBoard(Boolean isWorking, Long performance, String modelName, GpuServer gpuServer) {
        validate(isWorking, performance, modelName, gpuServer);
        this.isWorking = isWorking;
        this.performance = performance;
        this.modelName = modelName;
        this.gpuServer = gpuServer;
    }

    public GpuBoard(Long performance, String modelName, GpuServer gpuServer) {
        this(false, performance, modelName, gpuServer);
    }

    private void validate(Boolean isWorking, Long performance, String modelName, GpuServer gpuServer) {
        if (Objects.isNull(performance) || performance <= 0) {
            throw GpuBoardException.INVALID_PERFORMANCE.getException();
        }

        if (isWorking == null) {
            throw GpuBoardException.INVALID_STATUS.getException();
        }

        if (modelName == null || modelName.isEmpty()) {
            throw GpuBoardException.INVALID_MODEL.getException();
        }

        if (gpuServer == null) {
            throw GpuBoardException.INVALID_GPU_SERVER_ID.getException();
        }
    }

    public Long getId() {
        return id;
    }

    public Boolean getIsWorking() {
        return isWorking;
    }

    public Long getPerformance() {
        return performance;
    }

    public String getModelName() {
        return modelName;
    }

    public GpuServer getGpuServer() {
        return gpuServer;
    }

    public void addJob(Job job) {
        // TODO :: JOB QUEUE
    }

    public void cancel(Job job) {
        // TODO :: JOB QUEUE
        job.cancel();
    }

    public void complete(Job job) {
        // TODO :: JOB QUEUE
        job.complete();
    }
}
