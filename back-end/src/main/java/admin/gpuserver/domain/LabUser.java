package admin.gpuserver.domain;

import admin.gpuserver.exception.LabUserException;
import admin.lab.domain.Lab;

import javax.persistence.*;
import java.util.Objects;

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
        if (Objects.isNull(name) || name.isEmpty()) {
            throw new LabUserException("적절하지 않은 LabUser 이름입니다.");
        }

        if (Objects.isNull(userType)) {
            throw new LabUserException("LabUser의 타입은 Null일 수 없습니다.");
        }

        if (Objects.isNull(lab)) {
            throw new LabUserException("LabUser가 속한 Lab은 Null일 수 없습니다.");
        }
    }

    public Long getId() {
        return id;
    }
}
