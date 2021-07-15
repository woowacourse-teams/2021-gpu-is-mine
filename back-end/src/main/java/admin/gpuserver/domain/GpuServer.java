package admin.gpuserver.domain;

import admin.gpuserver.exception.GpuServerException;
import admin.lab.domain.Lab;

import javax.persistence.*;
import java.util.Objects;

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

    @Column(nullable = false)
    private Boolean deleted = false;

    @ManyToOne
    @JoinColumn(name = "lab_id")
    private Lab lab;

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
            throw new GpuServerException("적절한 GpuServer 이름이 아닙니다.");
        }

        if (Objects.isNull(isOn)) {
            throw new GpuServerException("GpuServer의 상태는 Null일 수 없습니다.");
        }

        if (memorySize == null || memorySize <= 0 || diskSize == null || diskSize <= 0) {
            throw new GpuServerException("유효하지 않은 GpuServer 정보입니다.");
        }

        if (Objects.isNull(lab)) {
            throw new GpuServerException("GpuServer의 Lab 정보는 Null일 수 없습니다.");
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

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public void update(String name) {
        this.name = name;
    }
}
