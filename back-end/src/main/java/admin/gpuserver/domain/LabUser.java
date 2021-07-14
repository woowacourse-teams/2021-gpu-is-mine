package admin.gpuserver.domain;

import admin.gpuserver.exception.GpuServerServiceException;
import admin.lab.domain.Lab;

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
        validate(name, userType, lab);
        this.name = name;
        this.userType = userType;
        this.lab = lab;
    }

    private void validate(String name, UserType userType, Lab lab) {
        if (name == null || name.isEmpty() || userType == null || lab == null) {
            throw new GpuServerServiceException("객체를 생성할 수 없습니다.");
        }
    }

    public Long getId() {
        return id;
    }
}
