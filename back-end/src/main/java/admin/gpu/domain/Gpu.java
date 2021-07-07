package admin.gpu.domain;

import javax.persistence.*;

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

    protected Gpu() {
    }
}
