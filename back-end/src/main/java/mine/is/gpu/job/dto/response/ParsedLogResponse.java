package mine.is.gpu.job.dto.response;

import mine.is.gpu.job.domain.ParsedLog;

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

    public ParsedLogResponse(ParsedLog parsedLog) {
        this(parsedLog.getCurrentEpoch(), parsedLog.getTotalEpoch(), parsedLog.getAccuracy(), parsedLog.getLoss());
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
