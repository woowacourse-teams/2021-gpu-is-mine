package admin.gpu.domain;

import javax.persistence.*;
import java.util.List;

@Entity
public class Gpu extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String gpuName;
    @Column(nullable = false)
    private String modelName;
    @Column(nullable = false)
    private Boolean running = false;
    @Column(nullable = false)
    private Integer teraflop;
    private Integer ramCapacity;
    private Integer diskCapacity;
    @ManyToOne
    @JoinColumn(name = "lab_id")
    private Lab lab;

    @Embedded
    private Jobs jobs;

    protected Gpu() {
    }

    public Gpu(String gpuName, String modelName, Boolean running, Integer teraflop, Integer ramCapacity, Integer diskCapacity, Lab lab) {
        this.gpuName = gpuName;
        this.modelName = modelName;
        this.running = running;
        this.teraflop = teraflop;
        this.ramCapacity = ramCapacity;
        this.diskCapacity = diskCapacity;
        this.lab = lab;
    }

    public List<Job> getWaitingJobs() {
        return jobs.getWaitingJobs();
    }

    public Long getId() {
        return id;
    }

    public Lab getLab() {
        return lab;
    }
}
