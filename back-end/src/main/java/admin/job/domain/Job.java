package admin.job.domain;

import admin.gpuserver.domain.BaseEntity;
import admin.gpuserver.domain.GpuBoard;
import admin.job.exception.JobException;
import admin.member.domain.Member;

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
            throw new JobException("적절한 Job 이름이 아닙니다.");
        }

        if (Objects.isNull(status)) {
            throw new JobException("Job 상태는 Null일 수 없습니다.");
        }

        if (Objects.isNull(gpuBoard)) {
            throw new JobException("Job의 gpuBoard는 Null일 수 없습니다.");
        }

        if (Objects.isNull(member)) {
            throw new JobException("Job의 Member는 Null일 수 없습니다.");
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
