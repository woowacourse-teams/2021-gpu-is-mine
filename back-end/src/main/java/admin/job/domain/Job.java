package admin.job.domain;

import admin.gpuserver.domain.BaseEntity;
import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.LabUser;
import admin.job.exception.JobException;

import javax.persistence.*;
import java.util.Objects;

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
        if (Objects.isNull(name) || name.isEmpty()) {
            throw new JobException("적절한 Job 이름이 아닙니다.");
        }

        if (Objects.isNull(status)) {
            throw new JobException("Job 상태는 Null일 수 없습니다.");
        }

        if (Objects.isNull(gpuBoard)) {
            throw new JobException("Job의 gpuBoard는 Null일 수 없습니다.");
        }

        if (Objects.isNull(labUser)) {
            throw new JobException("Job의 LabUser는 Null일 수 없습니다.");
        }
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

    public LabUser getLabUser() {
        return labUser;
    }

    public void cancel() {
        this.status = JobStatus.CANCELED;
    }

    public void complete() {
        this.status = JobStatus.COMPLETED;
    }
}
