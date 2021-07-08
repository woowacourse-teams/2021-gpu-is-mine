package admin.gpu.domain;

import javax.persistence.*;

@Entity
public class Job extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private Boolean isWorking = true;
    @ManyToOne
    @JoinColumn(name = "lab_user_id", nullable = false)
    private LabUser labUser;
    @ManyToOne
    @JoinColumn(name = "gpu_board_id", nullable = false)
    private GpuBoard gpuBoard;

    protected Job() {
    }


    @Override
    public String toString() {
        return "Job{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", isWorking=" + isWorking +
                ", labUser=" + labUser +
                ", gpuBoard=" + gpuBoard +
                '}';
    }

    public String getName() {
        return name;
    }

    public boolean isWorking() {
        return isWorking;
    }
}
