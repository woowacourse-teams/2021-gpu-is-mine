package admin.lab.domain;

import admin.gpuserver.domain.BaseEntity;
import admin.lab.exception.LabException;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Lab extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    protected Lab() {
    }

    public Lab(Long id, String name) {
        validate(name);
        this.id = id;
        this.name = name;
    }

    public Lab(String name) {
        this(null, name);
    }

    private void validate(String name) {
        if (Objects.isNull(name) || name.isEmpty()) {
            throw LabException.INVALID_LAB_NAME.getException();
        }
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Lab lab = (Lab) o;
        return id.equals(lab.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
