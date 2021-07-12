package admin.gpuserver.domain;

import javax.persistence.*;

@Entity
public class LabUser extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserType userType;
    @ManyToOne
    @JoinColumn(name = "lab_id")
    private Lab lab;

    protected LabUser() {
    }

    public LabUser(String name, UserType userType, Lab lab) {
        this.name = name;
        this.userType = userType;
        this.lab = lab;
    }
}
