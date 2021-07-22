package admin.member.domain;

import admin.gpuserver.domain.BaseEntity;
import admin.gpuserver.domain.GpuServer;
import admin.lab.domain.Lab;
import admin.member.exception.MemberException;

import javax.persistence.*;

@Entity
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MemberType memberType;

    @ManyToOne
    @JoinColumn(name = "lab_id")
    private Lab lab;

    public Member(String email, String password, String name, MemberType memberType, Lab lab) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.memberType = memberType;
        this.lab = lab;
    }

    protected Member() {
    }

    public void checkPermissionOnServer(GpuServer gpuServer) {
        if (!this.lab.equals(gpuServer.getLab())) {
            throw MemberException.UNAUTHORIZED_MEMBER.getException();
        }
    }

    public void checkSameLab(Member other) {
        if (this.lab.equals(other.getLab())) {
            throw MemberException.UNAUTHORIZED_MEMBER.getException();
        }
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public MemberType getMemberType() {
        return memberType;
    }

    public void setMemberType(MemberType memberType) {
        this.memberType = memberType;
    }

    public Lab getLab() {
        return lab;
    }

    public void setLab(Lab lab) {
        this.lab = lab;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
