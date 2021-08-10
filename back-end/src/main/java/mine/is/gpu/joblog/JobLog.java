package mine.is.gpu.joblog;

import javax.persistence.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "job")
public class JobLog {
    @Id
    private String id;
    private Integer currentEpoch;
    private Integer  totalEpoch;
    private Double accuracy;
    private Double loss;
    @Field(type = FieldType.Long, name = "jobId")
    private Long jobId;

    public JobLog() {
    }

    public JobLog(String id, Integer currentEpoch, Integer totalEpoch, Double accuracy, Double loss, Long jobId) {
        this.id = id;
        this.currentEpoch = currentEpoch;
        this.totalEpoch = totalEpoch;
        this.accuracy = accuracy;
        this.loss = loss;
        this.jobId = jobId;
    }

    public String getId() {
        return id;
    }

    public Integer getCurrentEpoch() {
        return currentEpoch;
    }

    public Integer getTotalEpoch() {
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

    @Override
    public String toString() {
        return "JobLog{" +
                "id='" + id + '\'' +
                ", currentEpoch=" + currentEpoch +
                ", totalEpoch=" + totalEpoch +
                ", accuracy=" + accuracy +
                ", loss=" + loss +
                ", jobId=" + jobId +
                '}';
    }
}
