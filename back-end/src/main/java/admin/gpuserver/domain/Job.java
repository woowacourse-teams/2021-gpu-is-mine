package admin.gpuserver.domain;

import admin.gpuserver.exception.GpuServerServiceException;

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
        validate(name, status, gpuBoard, labUser);
        this.name = name;
        this.status = status;
        this.gpuBoard = gpuBoard;
        this.labUser = labUser;
    }

    public Job(String name, GpuBoard gpuBoard, LabUser labUser) {
        this(name, JobStatus.WAITING, gpuBoard, labUser);
    }

    private void validate(String name, JobStatus status, GpuBoard gpuBoard, LabUser labUser) {
        if (name == null || name.isEmpty() || status == null || gpuBoard == null || labUser == null) {
            throw new GpuServerServiceException("객체를 생성할 수 없습니다.");
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public JobStatus getStatus() {
        return status;
    }

    public void setStatus(JobStatus status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public GpuBoard getGpuBoard() {
        return gpuBoard;
    }

    public void setGpuBoard(GpuBoard gpuBoard) {
        this.gpuBoard = gpuBoard;
    }

    public LabUser getLabUser() {
        return labUser;
    }

    public void setLabUser(LabUser labUser) {
        this.labUser = labUser;
    }

    public void cancel() {
        this.status = JobStatus.CANCELED;
    }

    public void complete() {
        this.status = JobStatus.COMPLETED;
    }
}
