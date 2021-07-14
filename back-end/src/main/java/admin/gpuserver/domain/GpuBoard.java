package admin.gpuserver.domain;

import admin.gpuserver.exception.GpuServerServiceException;

import javax.persistence.*;

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

    public GpuBoard() {
    }

    public GpuBoard(Boolean isWorking, Long performance, String modelName, GpuServer gpuServer) {
        validate(isWorking, performance, modelName, gpuServer);
        this.isWorking = isWorking;
        this.performance = performance;
        this.modelName = modelName;
        this.gpuServer = gpuServer;
    }

    private void validate(Boolean isWorking, Long performance, String modelName, GpuServer gpuServer) {
        if (isWorking == null || performance == null || performance <= 0
                || modelName == null || modelName.isEmpty()
                || gpuServer == null) {
            throw new GpuServerServiceException("객체를 생성할 수 없습니다.");
        }
    }

    public Boolean getWorking() {
        return isWorking;
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

    public void addJob(Job newJob) {
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
