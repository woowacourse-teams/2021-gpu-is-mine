package mine.is.gpu.job.domain;

import java.time.Instant;
import javax.persistence.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "job")
public class PureLog {
    @Id
    private String id;
    private String log;
    @Field(type = FieldType.Long)
    private Long jobId;
    @Field(type = FieldType.Date, format = DateFormat.date_time)
    private Instant time;


    public PureLog() {
    }

    public PureLog(String id, String log, Long jobId) {
        this.id = id;
        this.log = log;
        this.jobId = jobId;
    }

    public String getId() {
        return id;
    }

    public String getLog() {
        return log;
    }

    public Long getJobId() {
        return jobId;
    }

    public Instant getTime() {
        return time;
    }

    @Override
    public String toString() {
        return "\nPureLog{" +
                "id='" + id + '\'' +
                ", log='$$" + log + '\'' +
                "$$, jobId=" + jobId +
                '}';
    }
}
