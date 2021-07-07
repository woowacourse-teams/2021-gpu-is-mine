package admin.gpu.domain;

import javax.persistence.Embeddable;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Embeddable
public class Jobs {
    @OneToMany(mappedBy = "gpu")
    List<Job> jobs = new ArrayList<>();
}
