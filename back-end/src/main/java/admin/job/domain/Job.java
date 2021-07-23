package admin.job.domain;

import admin.gpuserver.domain.BaseEntity;
import admin.gpuserver.domain.GpuBoard;
import admin.job.exception.JobException;
import admin.member.domain.Member;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

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
    private Member member;

    protected Job() {
    }

    public Job(String name, JobStatus status, GpuBoard gpuBoard, Member member) {
        validate(name, status, gpuBoard, member);
        this.name = name;
        this.status = status;
        this.gpuBoard = gpuBoard;
        this.member = member;
    }

    public Job(String name, GpuBoard gpuBoard, Member member) {
        this(name, JobStatus.WAITING, gpuBoard, member);
    }

    private void validate(String name, JobStatus status, GpuBoard gpuBoard, Member member) {
        if (Objects.isNull(name) || name.isEmpty()) {
            throw JobException.INVALID_JOB_NAME.getException();
        }

        if (Objects.isNull(status)) {
            throw JobException.INVALID_STATUS.getException();
        }

        if (Objects.isNull(gpuBoard)) {
            throw JobException.INVALID_GPU_BOARD.getException();
        }

        if (Objects.isNull(member)) {
            throw JobException.INVALID_MEMBER.getException();
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

    public Member getMember() {
        return member;
    }

    public void cancel() {
        this.status = JobStatus.CANCELED;
    }

    public void complete() {
        this.status = JobStatus.COMPLETED;
    }
}
