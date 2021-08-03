package mine.is.gpu.job.fixture;

import mine.is.gpu.job.dto.request.JobRequest;

public class JobFixtures {

    private static final String NAME = "job";
    private static final String META_DATA = "meta_dat";
    private static final String EXPECTED_TIME = "12";

    public static JobRequest jobCreationRequest(Long serverId) {
        return new JobRequest(serverId, NAME, META_DATA, EXPECTED_TIME);
    }
}
