package mine.is.gpu.job.domain;

import java.time.LocalDateTime;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import mine.is.gpu.account.domain.Member;
import mine.is.gpu.gpuserver.domain.BaseEntity;
import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.job.exception.JobException;

@Entity
public class Job extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JobStatus status;

    @ManyToOne
    private GpuBoard gpuBoard;

    @ManyToOne
    private Member member;

    @Column(nullable = false)
    private String metaData;

    @Column(nullable = false)
    private String expectedTime;

    private LocalDateTime startedTime;

    private LocalDateTime endedTime;

    protected Job() {
    }

    public Job(String name, JobStatus status, GpuBoard gpuBoard, Member member,
            String metaData, String expectedTime, LocalDateTime startedTime, LocalDateTime endedTime) {
        validate(name, status, gpuBoard, member, metaData, expectedTime);
        this.name = name;
        this.status = status;
        this.gpuBoard = gpuBoard;
        this.member = member;
        this.metaData = metaData;
        this.expectedTime = expectedTime;
        this.startedTime = startedTime;
        this.endedTime = endedTime;
    }

    public Job(String name, JobStatus status, GpuBoard gpuBoard, Member member,
               String metaData, String expectedTime) {
        this(name, status, gpuBoard, member, metaData, expectedTime, null, null);
    }

    public Job(String name, GpuBoard gpuBoard, Member member, String metaData,
               String expectedTime) {
        this(name, JobStatus.WAITING, gpuBoard, member, metaData, expectedTime);
    }

    private void validate(String name, JobStatus status, GpuBoard gpuBoard, Member member,
                          String metaData, String expectedTime) {
        if (Objects.isNull(name) || name.isEmpty()) {
            throw JobException.INVALID_JOB_NAME.getException();
        }

        if (Objects.isNull(status)) {
            throw JobException.INVALID_JOB_STATUS.getException();
        }

        if (Objects.isNull(gpuBoard)) {
            throw JobException.INVALID_GPU_BOARD.getException();
        }

        if (Objects.isNull(member)) {
            throw JobException.INVALID_MEMBER.getException();
        }

        if (Objects.isNull(metaData) || metaData.isEmpty()) {
            throw JobException.INVALID_META_DATA.getException();
        }

        if (Objects.isNull(expectedTime) || expectedTime.isEmpty() || !expectedTime.matches("\\d+")) {
            throw JobException.INVALID_EXPECTED_TIME.getException();
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

    public Long getId() {
        return id;
    }

    public GpuBoard getGpuBoard() {
        return gpuBoard;
    }

    public Member getMember() {
        return member;
    }

    public String getMetaData() {
        return metaData;
    }

    public String getExpectedTime() {
        return expectedTime;
    }

    public void cancel() {
        if (!this.status.isWaiting()) {
            throw JobException.NO_WAITING_JOB.getException();
        }
        this.status = JobStatus.CANCELED;
        this.endedTime = LocalDateTime.now();
    }

    public void start() {
        if (!this.status.isWaiting()) {
            throw JobException.JOB_NOT_WAITING.getException();
        }
        this.status = JobStatus.RUNNING;
        this.startedTime = LocalDateTime.now();
    }

    public void complete() {
        if (!this.status.isRunning()) {
            throw JobException.JOB_NOT_RUNNING.getException();
        }
        this.status = JobStatus.COMPLETED;
        this.endedTime = LocalDateTime.now();
    }

    public GpuServer getGpuServer() {
        return gpuBoard.getGpuServer();
    }

    public void changeStatus(JobStatus status) {
        this.status = status;
    }

    public LocalDateTime getStartedTime() {
        return startedTime;
    }

    public LocalDateTime getEndedTime() {
        return endedTime;
    }
}
