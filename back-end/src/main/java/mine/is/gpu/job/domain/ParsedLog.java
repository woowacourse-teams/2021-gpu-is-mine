package mine.is.gpu.job.domain;

import javax.persistence.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "job")
public class ParsedLog {
    @Id
    private String id;
    private Long currentEpoch;
    private Long totalEpoch;
    private Float accuracy;
    private Float loss;
    @Field(type = FieldType.Long, name = "jobId")
    private Long jobId;

    public ParsedLog() {
    }

    public ParsedLog(Long currentEpoch, Long totalEpoch, Float accuracy, Float loss, Long jobId) {
        this.currentEpoch = currentEpoch;
        this.totalEpoch = totalEpoch;
        this.accuracy = accuracy;
        this.loss = loss;
        this.jobId = jobId;
    }

    public String getId() {
        return id;
    }

    public Long getCurrentEpoch() {
        return currentEpoch;
    }

    public Long getTotalEpoch() {
        return totalEpoch;
    }

    public Float getAccuracy() {
        return accuracy;
    }

    public Float getLoss() {
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
                '}' + "\n";
    }

}