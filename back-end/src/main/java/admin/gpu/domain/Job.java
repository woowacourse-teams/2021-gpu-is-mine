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
    private Boolean waiting = true;
    @ManyToOne
    @JoinColumn(name = "lab_user_id", nullable = false)
    private LabUser labUser;

    @ManyToOne
    @JoinColumn(name = "gpu_id", nullable = false)
    private Gpu gpu;

    protected Job() {
    }

    @Override
    public String toString() {
        return "Job{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", waiting=" + waiting +
                ", labUser=" + labUser +
                ", gpu=" + gpu +
                '}';
    }

    public String getName() {
        return name;
    }

    public boolean isWaiting() {
        return waiting;
    }
}
