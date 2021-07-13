package admin.gpuserver.domain;

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
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;
    @ManyToOne
    @JoinColumn(name = "gpu_board_id", nullable = false)
    private GpuBoard gpuBoard;

    protected Job() {
    }

    public Job(String name, JobStatus status) {
        this.name = name;
        this.status = status;
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
}
