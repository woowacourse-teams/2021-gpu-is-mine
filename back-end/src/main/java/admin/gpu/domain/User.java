package admin.gpu.domain;

import javax.persistence.*;

@Entity
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private UserType userType;
    @ManyToOne
    @JoinColumn(name = "lab_id")
    private Lab lab;

    protected User() {
    }
}
