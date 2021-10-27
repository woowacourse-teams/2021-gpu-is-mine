package mine.is.gpu.job.domain;

import java.time.LocalDateTime;
import java.util.List;
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

    @Column(nullable = false)
    private LocalDateTime expectedStartedTime;
    private LocalDateTime startedTime;
    private LocalDateTime completedTime;
    private LocalDateTime expectedCompletedTime;

    protected Job() {
    }

    public Job(String name, JobStatus status, GpuBoard gpuBoard, Member member, String metaData,
               String expectedTime, LocalDateTime expectedStartedTime) {
        validate(name, status, gpuBoard, member, metaData, expectedTime, expectedStartedTime);
        this.name = name;
        this.status = status;
        this.gpuBoard = gpuBoard;
        this.member = member;
        this.metaData = metaData;
        this.expectedTime = expectedTime;
        this.expectedStartedTime = expectedStartedTime;
        this.expectedCompletedTime = this.expectedStartedTime.plusHours(Long.parseLong(expectedTime));
    }

    public Job(String name, JobStatus status, GpuBoard gpuBoard, Member member, String metaData, String expectedTime) {
        this(name, status, gpuBoard, member, metaData, expectedTime, LocalDateTime.now());
    }

    public Job(String name, GpuBoard gpuBoard, Member member, String metaData, String expectedTime) {
        this(name, JobStatus.WAITING, gpuBoard, member, metaData, expectedTime);
    }

    private void validate(String name, JobStatus status, GpuBoard gpuBoard, Member member,
                          String metaData, String expectedTime, LocalDateTime expectedStartedTime) {
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

        if (Objects.isNull(expectedStartedTime)) {
            throw JobException.INVALID_EXPECTED_STARTED_TIME.getException();
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
        this.completedTime = LocalDateTime.now();
    }

    public void start() {
        if (!this.status.isWaiting()) {
            throw JobException.JOB_NOT_WAITING.getException();
        }
        this.status = JobStatus.RUNNING;
        this.startedTime = LocalDateTime.now();
        this.expectedCompletedTime = startedTime.plusHours(Long.parseLong(expectedTime));
    }

    public void complete() {
        if (!this.status.isRunning()) {
            throw JobException.JOB_NOT_RUNNING.getException();
        }
        this.status = JobStatus.COMPLETED;
        this.completedTime = LocalDateTime.now();
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

    public void setStartedTime(LocalDateTime startedTime) {
        this.startedTime = startedTime;
    }

    public LocalDateTime getCompletedTime() {
        return completedTime;
    }

    public LocalDateTime getExpectedStartedTime() {
        return expectedStartedTime;
    }

    public LocalDateTime getExpectedCompletedTime() {
        return expectedCompletedTime;
    }

    public void setCompletedTime(LocalDateTime completedTime) {
        this.completedTime = completedTime;
    }

    public void calculateExpectingTime(List<Job> prevWaitingJobs) {
        if (prevWaitingJobs.isEmpty()) {
            updateExpectedStartedTime(LocalDateTime.now());
            return;
        }
        Job last = prevWaitingJobs.get(prevWaitingJobs.size() - 1);
        updateExpectedStartedTime(last.getExpectedCompletedTime());
    }

    public void updateExpectedStartedTime(LocalDateTime expectedStartedTime) {
        this.expectedStartedTime = expectedStartedTime;
        this.expectedCompletedTime = this.expectedStartedTime.plusHours(Long.parseLong(expectedTime));
    }
}
