package mine.is.gpu.gpuserver.domain;

import mine.is.gpu.gpuserver.exception.GpuServerException;
import mine.is.gpu.lab.domain.Lab;
import java.time.LocalDateTime;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class GpuServer extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Boolean isOn = false;

    private Long memorySize;
    private Long diskSize;

    @ManyToOne
    @JoinColumn(name = "lab_id")
    private Lab lab;

    @Column(name = "last_response")
    private LocalDateTime lastResponse;

    protected GpuServer() {
    }

    public GpuServer(String name, Boolean isOn, Long memorySize, Long diskSize, Lab lab) {
        validate(name, isOn, memorySize, diskSize, lab);
        this.name = name;
        this.isOn = isOn;
        this.memorySize = memorySize;
        this.diskSize = diskSize;
        this.lab = lab;
    }

    public GpuServer(String name, Long memorySize, Long diskSize, Lab lab) {
        this(name, false, memorySize, diskSize, lab);
    }

    private void validate(String name, Boolean isOn, Long memorySize, Long diskSize, Lab lab) {
        if (Objects.isNull(name) || name.isEmpty()) {
            throw GpuServerException.INVALID_NAME.getException();
        }

        if (Objects.isNull(isOn)) {
            throw GpuServerException.INVALID_STATUS.getException();
        }

        if (memorySize == null || memorySize <= 0 || diskSize == null || diskSize <= 0) {
            throw GpuServerException.INVALID_GPU_INFO.getException();
        }

        if (Objects.isNull(lab)) {
            throw GpuServerException.INVALID_LAB_ID.getException();
        }
    }

    public Long getId() {
        return id;
    }

    public Lab getLab() {
        return lab;
    }

    public String getName() {
        return name;
    }

    public Boolean getIsOn() {
        return isOn;
    }

    public Long getMemorySize() {
        return memorySize;
    }

    public Long getDiskSize() {
        return diskSize;
    }

    public Boolean getOn() {
        return isOn;
    }

    public void update(String name) {
        this.name = name;
    }

    public void changeStatus(Boolean isOn) {
        this.isOn = isOn;
    }

    public void updateLastResponse(LocalDateTime lastResponse) {
        this.lastResponse = lastResponse;
    }

    public LocalDateTime getLastResponse() {
        return lastResponse;
    }
}
