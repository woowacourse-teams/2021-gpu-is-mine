package admin.worker.dto;

import admin.worker.domain.Log;
import java.util.List;
import java.util.stream.Collectors;

public class LogsResponse {

    private List<String> logs;

    private LogsResponse(List<String> logs) {
        this.logs = logs;
    }

    public static LogsResponse of(List<Log> logs) {
        return new LogsResponse(logs.stream().map(Log::getContent).collect(Collectors.toList()));
    }

    public List<String> getLogs() {
        return logs;
    }
}

