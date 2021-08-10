package mine.is.gpu.job.dto.response;

import java.util.List;
import java.util.stream.Collectors;
import mine.is.gpu.job.domain.JobLog;

public class ParsedLogResponses {
    private List<ParsedLogResponse> parsedLogResponses;

    public ParsedLogResponses() {
    }

    private ParsedLogResponses(List<ParsedLogResponse> parsedLogResponses) {
        this.parsedLogResponses = parsedLogResponses;
    }

    public static ParsedLogResponses of(List<JobLog> jobLogs) {
        List<ParsedLogResponse> responses = jobLogs.stream()
                .filter(log -> log.getCurrentEpoch() != null)
                .map(ParsedLogResponse::new)
                .collect(Collectors.toList());
        return new ParsedLogResponses(responses);
    }

    public List<ParsedLogResponse> getParsedLogResponses() {
        return parsedLogResponses;
    }
}
