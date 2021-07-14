package admin.gpuserver.domain;

import admin.lab.domain.Lab;

import javax.persistence.*;
import java.util.List;

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
    @OneToOne(mappedBy = "gpuServer")
    private GpuBoard gpuBoard;
    @Column(nullable = false)
    private Boolean deleted = false;

    @ManyToOne
    @JoinColumn(name = "lab_id")
    private Lab lab;

    protected GpuServer() {
    }

    public GpuServer(String name, Boolean isOn, Long memorySize, Long diskSize, Lab lab) {
        this.name = name;
        this.isOn = isOn;
        this.memorySize = memorySize;
        this.diskSize = diskSize;
        this.lab = lab;
    }

    public GpuServer(String name, Long memorySize, Long diskSize, Lab lab) {
        this.name = name;
        this.memorySize = memorySize;
        this.diskSize = diskSize;
        this.lab = lab;
    }

    public Long getId() {
        return id;
    }

    public Lab getLab() {
        return lab;
    }

    public List<Job> getWaitingJobs() {
        return gpuBoard.getWaitingJobs();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public GpuBoard getGpuBoard() {
        return gpuBoard;
    }

    public void setGpuBoard(GpuBoard gpuBoard) {
        this.gpuBoard = gpuBoard;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }
}
