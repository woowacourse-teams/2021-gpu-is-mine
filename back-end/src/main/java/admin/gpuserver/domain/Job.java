package admin.gpuserver.domain;

import javax.persistence.*;

@Entity
public class Job extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "status")
    private JobStatus status;

    @ManyToOne
    private GpuBoard gpuBoard;

    @ManyToOne
    private LabUser labUser;

    protected Job() {
    }

    public Job(String name, JobStatus status, GpuBoard gpuBoard, LabUser labUser) {
        this.name = name;
        this.status = status;
        this.gpuBoard = gpuBoard;
        this.labUser = labUser;
    }

    public String getName() {
        return name;
    }

    public JobStatus getStatus() {
        return status;
    }

    public Long getId() {
        return id;
    }

    public GpuBoard getGpuBoard() {
        return gpuBoard;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStatus(JobStatus status) {
        this.status = status;
    }

    public void setGpuBoard(GpuBoard gpuBoard) {
        this.gpuBoard = gpuBoard;
    }

    public void setLabUser(LabUser labUser) {
        this.labUser = labUser;
    }

    public LabUser getLabUser() {
        return labUser;
    }
}
