package admin.worker.domain;

import admin.gpuserver.domain.BaseEntity;
import admin.job.domain.Job;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@Entity
public class Log extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String content;

    @ManyToOne
    private Job job;

    protected Log() {
    }

    public Log(String content, Job job) {
        this.content = content;
        this.job = job;
    }


    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public Job getJob() {
        return job;
    }
}
