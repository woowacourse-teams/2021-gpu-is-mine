package mine.is.gpu.job.dto.response;

import java.util.List;
import java.util.stream.Collectors;
import mine.is.gpu.job.domain.JobLog;

public class ParsedLogResponse {

    private Long currentEpoch;
    private Long totalEpoch;
    private Float accuracy;
    private Float loss;

    public ParsedLogResponse() {
    }

    private ParsedLogResponse(Long currentEpoch, Long totalEpoch, Float accuracy, Float loss) {
        this.currentEpoch = currentEpoch;
        this.totalEpoch = totalEpoch;
        this.accuracy = accuracy;
        this.loss = loss;
    }

    public ParsedLogResponse(JobLog jobLog) {
        this(jobLog.getCurrentEpoch(), jobLog.getTotalEpoch(), jobLog.getAccuracy(), jobLog.getLoss());
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
}
