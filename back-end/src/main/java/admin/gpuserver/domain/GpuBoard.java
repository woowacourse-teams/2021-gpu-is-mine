package admin.gpuserver.domain;

import admin.gpuserver.exception.GpuBoardException;
import admin.job.domain.Job;

import javax.persistence.*;
import java.util.Objects;

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
            throw new GpuBoardException("잘못된 GpuBoard 정보 입력입니다.");
        }

        if (isWorking == null) {
            throw new GpuBoardException("GpuBoard 상태는 Null일 수 없습니다.");
        }

        if (modelName == null || modelName.isEmpty()) {
            throw new GpuBoardException("적절하지 않은 GpuBoard 이름 정보입니다.");
        }

        if (gpuServer == null) {
            throw new GpuBoardException("GpuBoard의 GpuServer 정보는 Null일 수 없습니다.");
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
