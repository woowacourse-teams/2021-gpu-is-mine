package mine.is.gpu.admin;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import mine.is.gpu.gpuserver.domain.BaseEntity;

@Entity
public class Administrator extends BaseEntity implements User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String email;
    private String password;

    protected Administrator() {
    }

    public Administrator(String name, String password) {
        this.email = name;
        this.password = password;
    }

    @Override
    public boolean hasSamePassword(String password) {
        return this.password.equals(password);
    }
}
