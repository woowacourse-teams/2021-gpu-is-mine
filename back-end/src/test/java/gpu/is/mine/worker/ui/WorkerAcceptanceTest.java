package gpu.is.mine.worker.ui;

import static gpu.is.mine.auth.AuthAcceptanceTest.회원_등록_및_로그인_후_토큰_발급;
import static gpu.is.mine.job.fixture.JobFixtures.jobCreationRequest;
import static gpu.is.mine.job.ui.JobAcceptanceTest.Job_Id로_검색;
import static gpu.is.mine.job.ui.JobAcceptanceTest.Job_예약_후_id_반환;
import static gpu.is.mine.lab.ui.LabAcceptanceTest.LAB_생성_요청_후_생성_ID_리턴;
import static gpu.is.mine.member.fixture.MemberFixtures.managerCreationRequest;
import static gpu.is.mine.member.fixture.MemberFixtures.userCreationRequest;
import static org.assertj.core.api.Assertions.assertThat;

import gpu.is.mine.AcceptanceTest;
import gpu.is.mine.gpuserver.domain.repository.GpuBoardRepository;
import gpu.is.mine.gpuserver.domain.repository.GpuServerRepository;
import gpu.is.mine.gpuserver.dto.response.GpuServerResponse;
import gpu.is.mine.job.domain.JobStatus;
import gpu.is.mine.job.domain.repository.JobRepository;
import gpu.is.mine.job.dto.response.JobResponse;
import gpu.is.mine.lab.domain.repository.LabRepository;
import gpu.is.mine.lab.dto.LabRequest;
import gpu.is.mine.member.domain.repository.MemberRepository;
import gpu.is.mine.worker.dto.WorkerJobRequest;
import gpu.is.mine.worker.dto.WorkerRequest;
import gpu.is.mine.gpuserver.fixture.GpuServerFixtures;
import gpu.is.mine.gpuserver.ui.GpuServerAcceptanceTest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import java.time.LocalDateTime;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

@DisplayName("[WorkerAcceptanceTest]")
class WorkerAcceptanceTest extends AcceptanceTest {
    @Autowired
    private LabRepository labRepository;
    @Autowired
    private GpuServerRepository gpuServerRepository;
    @Autowired
    private GpuBoardRepository gpuBoardRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private JobRepository jobRepository;

    private Long labId;
    private Long serverId;
    private String userToken;
    private String managerToken;
    private Long jobId;
    private Long jobBId;

    private static ExtractableResponse<Response> 진행할_job_요청(Long gpuServerId) {
        return RestAssured.given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/workers/gpus/" + gpuServerId + "/job")
                .then()
                .extract();
    }

    private static ExtractableResponse<Response> Job_상태변경(Long jobId,
            WorkerJobRequest workerJobRequest) {
        return RestAssured.given()
                .body(workerJobRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .put("/api/workers/jobs/" + jobId + "/status")
                .then()
                .extract();
    }

    private static ExtractableResponse<Response> GpuServer_상태변경(Long gpuServerId,
            WorkerRequest workerRequest) {
        return RestAssured.given()
                .body(workerRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .put("/api/workers/gpus/" + gpuServerId + "/status")
                .then()
                .extract();
    }

    @Override
    @BeforeEach
    public void setUp() {
        super.setUp();
        labId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab"));

        userToken = 회원_등록_및_로그인_후_토큰_발급(userCreationRequest(labId));
        managerToken = 회원_등록_및_로그인_후_토큰_발급(managerCreationRequest(labId));

        serverId = GpuServerAcceptanceTest.GpuServer_생성후아이디찾기(managerToken, labId,
                GpuServerFixtures.gpuServerCreationRequest());

        jobId = Job_예약_후_id_반환(labId, jobCreationRequest(serverId), userToken);
    }

    @DisplayName("큐에서 작업을 진행할 job 을 가져온다.")
    @Test
    void takeJob() {
        ExtractableResponse<Response> response = 진행할_job_요청(serverId);

        JobResponse jobResponse = response.body().as(JobResponse.class);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        assertThat(jobResponse).isNotNull();
        assertThat(jobResponse.getId()).isEqualTo(jobId);
    }

    @DisplayName("job 의 상태를 변경한다.")
    @Test
    void updateJobStatus() {
        ExtractableResponse<Response> jobResponse = Job_Id로_검색(labId, jobId, userToken);
        assertThat(jobResponse.body().as(JobResponse.class).getStatus()).isEqualTo(
                JobStatus.WAITING);

        ExtractableResponse<Response> response = Job_상태변경(jobId,
                new WorkerJobRequest(JobStatus.RUNNING));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        ExtractableResponse<Response> afterResponse = Job_Id로_검색(labId, jobId, userToken);
        assertThat(afterResponse.body().as(JobResponse.class).getStatus()).isEqualTo(
                JobStatus.RUNNING);
    }

    @DisplayName("GpuServer 의 상태를 변경한다.")
    @Test
    void updateWorkerStatus() {
        ExtractableResponse<Response> gpuServerResponse = GpuServerAcceptanceTest.GpuServer_아이디조회(
                managerToken, labId, serverId);
        assertThat(gpuServerResponse.body().as(GpuServerResponse.class).getIsOn()).isFalse();

        ExtractableResponse<Response> response =
                GpuServer_상태변경(serverId, new WorkerRequest(true, LocalDateTime.now()));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        ExtractableResponse<Response> actualGpuServerResponse = GpuServerAcceptanceTest.GpuServer_아이디조회(
                managerToken, labId, serverId);
        assertThat(actualGpuServerResponse.body().as(GpuServerResponse.class).getIsOn()).isTrue();
    }
}
