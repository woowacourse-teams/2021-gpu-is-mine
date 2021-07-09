package admin.gpuserver.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
    @JoinColumn(name = "lab_user_id", nullable = false)
    private LabUser labUser;
    @ManyToOne
    @JoinColumn(name = "gpu_board_id", nullable = false)
    private GpuBoard gpuBoard;

    protected Job() {
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
