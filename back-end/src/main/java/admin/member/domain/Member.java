package admin.member.domain;

import admin.gpuserver.domain.BaseEntity;
import admin.gpuserver.domain.GpuServer;
import admin.job.domain.Job;
import admin.lab.domain.Lab;
import admin.member.exception.MemberException;
import java.util.Objects;
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

    public Member(Long id, String email, String password, String name, MemberType memberType, Lab lab) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.memberType = memberType;
        this.lab = lab;
    }

    public Member(String email, String password, String name, MemberType memberType, Lab lab) {
        this(null, email, password, name, memberType, lab);
    }

    protected Member() {
    }

    public void checkPermissionOnLab(Lab lab) {
        if (!this.lab.equals(lab)) {
            throw MemberException.UNAUTHORIZED_MEMBER.getException();
        }
    }

    public void checkPermissionOnServer(GpuServer gpuServer) {
        checkPermissionOnLab(gpuServer.getLab());
    }

    public void checkReadable(Job job) {
        boolean hasPermission = isSameLab(job.getMember());

        if (!hasPermission) {
            throw MemberException.UNAUTHORIZED_MEMBER.getException();
        }
    }

    public void checkEditable(Job job) {
        checkReadable(job);

        boolean hasPermission = memberType.isManager() || isMyJob(job);

        if (!hasPermission) {
            throw MemberException.UNAUTHORIZED_MEMBER.getException();
        }
    }

    private boolean isMyJob(Job job) {
        return this.equals(job.getMember());
    }

    private boolean isSameLab(Member other) {
        return this.lab.equals(other.lab);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Member member = (Member) o;
        return Objects.equals(id, member.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
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

    public boolean hasSamePassword(String password) {
        return this.password.equals(password);
    }
}
