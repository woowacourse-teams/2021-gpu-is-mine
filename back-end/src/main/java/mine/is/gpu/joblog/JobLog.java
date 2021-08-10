package mine.is.gpu.joblog;

import javax.persistence.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "job")
public class JobLog {
    @Id
    private Long id;
    private Long currentEpoch;
    private Long  totalEpoch;
    private Double accuracy;
    private Double loss;
    @Field(type = FieldType.Long, name = "jobId")
    private Long jobId;

    public JobLog() {
    }

    public JobLog(Long currentEpoch, Long totalEpoch, Double accuracy, Double loss, Long jobId) {
        this.currentEpoch = currentEpoch;
        this.totalEpoch = totalEpoch;
        this.accuracy = accuracy;
        this.loss = loss;
        this.jobId = jobId;
    }

    public Long getCurrentEpoch() {
        return currentEpoch;
    }

    public Long getTotalEpoch() {
        return totalEpoch;
    }

    public Double getAccuracy() {
        return accuracy;
    }

    public Double getLoss() {
        return loss;
    }

    public Long getJobId() {
        return jobId;
    }
}