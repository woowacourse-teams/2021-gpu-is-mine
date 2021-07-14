package admin.member.domain;

import admin.gpuserver.domain.BaseEntity;
import admin.lab.domain.Lab;

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

    protected Member() {
    }

    public Member(String email, String password, String name, MemberType memberType, Lab lab) {
        this(null, email, password, name, memberType, lab);
    }

    public Member(Long id, String email, String password, String name, MemberType memberType, Lab lab) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.memberType = memberType;
        this.lab = lab;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public MemberType getMemberType() {
        return memberType;
    }

    public Lab getLab() {
        return lab;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMemberType(MemberType memberType) {
        this.memberType = memberType;
    }

    public void setLab(Lab lab) {
        this.lab = lab;
    }
}
