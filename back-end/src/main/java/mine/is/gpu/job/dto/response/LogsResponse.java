package mine.is.gpu.job.dto.response;

import java.util.List;
import java.util.stream.Collectors;
import mine.is.gpu.job.domain.Log;

public class LogsResponse {
    private List<String> logs;

    public LogsResponse() {
    }

    private LogsResponse(List<String> logs) {
        this.logs = logs;
    }

    public static LogsResponse of(List<Log> logs) {
        return new LogsResponse(logs.stream().map(Log::getLog).collect(Collectors.toList()));
    }

    public List<String> getLogs() {
        return logs;
    }
}

