package admin.gpuserver.domain;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany
    @JoinColumn(name = "job_id")
    List<Job> jobs = new ArrayList<>();

    protected GpuBoard() {
    }

    public GpuBoard(Boolean isWorking, Long performance, String modelName, GpuServer gpuServer) {
        this.isWorking = isWorking;
        this.performance = performance;
        this.modelName = modelName;
        this.gpuServer = gpuServer;
    }

    public Boolean getWorking() {
        return isWorking;
    }

    public List<Job> getJobs() {
        return jobs;
    }

    public void setJobs(List<Job> jobs) {
        this.jobs = jobs;
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
}
