package mine.is.gpu.job.ui;

import static org.assertj.core.api.Assertions.assertThat;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import mine.is.gpu.AcceptanceTest;
import mine.is.gpu.auth.AuthAcceptanceTest;
import mine.is.gpu.gpuserver.fixture.GpuServerFixtures;
import mine.is.gpu.gpuserver.ui.GpuServerAcceptanceTest;
import mine.is.gpu.job.domain.JobStatus;
import mine.is.gpu.job.dto.request.JobRequest;
import mine.is.gpu.job.dto.request.JobUpdateRequest;
import mine.is.gpu.job.dto.response.JobResponse;
import mine.is.gpu.job.fixture.JobFixtures;
import mine.is.gpu.lab.dto.LabRequest;
import mine.is.gpu.lab.ui.LabAcceptanceTest;
import mine.is.gpu.member.fixture.MemberFixtures;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

public class JobAcceptanceTest extends AcceptanceTest {

    private Long labId;
    private Long serverId;
    private String userToken;
    private String managerToken;

    public static ExtractableResponse<Response> Job_목록_serverId로_검색(Long labId, Long serverId, String accessToken) {
        return RestAssured.given()
                .auth()
                .oauth2(accessToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/labs/" + labId + "/jobs?serverId=" + serverId)
                .then()
                .extract();
    }

    public static ExtractableResponse<Response> Job_Id로_검색(Long labId, Long jobId, String accessToken) {
        return RestAssured.given()
                .auth()
                .oauth2(accessToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/labs/" + labId + "/jobs/" + jobId)
                .then()
                .extract();
    }

    public static ExtractableResponse<Response> Job_취소(Long labId, Long jobId, String accessToken) {
        return RestAssured.given()
                .auth()
                .oauth2(accessToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .put("/api/labs/" + labId + "/jobs/" + jobId + "/cancel")
                .then()
                .extract();
    }

    public static ExtractableResponse<Response> Job_예약(Long labId, JobRequest jobRequest, String accessToken) {
        return RestAssured.given()
                .auth()
                .oauth2(accessToken)
                .body(jobRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .post("/api/labs/" + labId + "/jobs")
                .then()
                .extract();
    }

    public static ExtractableResponse<Response> Job_수정(Long labId, Long jobId, JobUpdateRequest jobUpdateRequest,
                                                       String accessToken) {
        return RestAssured.given()
                .auth()
                .oauth2(accessToken)
                .body(jobUpdateRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .put("/api/labs/" + labId + "/jobs/" + jobId)
                .then()
                .extract();
    }

    public static Long Job_예약_후_id_반환(Long labId, JobRequest jobRequest, String accessToken) {
        ExtractableResponse<Response> response = Job_예약(labId, jobRequest, accessToken);
        return extractCreatedId(response.header("location"));
    }

    private static Long extractCreatedId(String uri) {
        String[] uriToken = uri.split("/");
        return Long.valueOf(uriToken[uriToken.length - 1]);
    }

    @Override
    @BeforeEach
    public void setUp() {
        super.setUp();

        labId = LabAcceptanceTest.LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab"));

        userToken = AuthAcceptanceTest.회원_등록_및_로그인_후_토큰_발급(
                MemberFixtures.userCreationRequest(labId, "userTemp@email.com", "password"));
        managerToken = AuthAcceptanceTest.회원_등록_및_로그인_후_토큰_발급(
                MemberFixtures.managerCreationRequest(labId, "managerTemp@email.com", "password"));

        serverId = GpuServerAcceptanceTest
                .GpuServer_생성후아이디찾기(managerToken, labId, GpuServerFixtures.gpuServerCreationRequest());
    }

    @DisplayName("소속되지 않는 lab에 job을 예약할 수 없다.")
    @Test
    void addJobWithoutPermission() {
        Long otherLabId = LabAcceptanceTest.LAB_생성_요청_후_생성_ID_리턴(new LabRequest("otherLabId"));
        String otherLabUserToken = AuthAcceptanceTest.회원_등록_및_로그인_후_토큰_발급(
                MemberFixtures.managerCreationRequest(otherLabId, "other@other.com", "password"));
        Long otherLabServerId = GpuServerAcceptanceTest
                .GpuServer_생성후아이디찾기(otherLabUserToken, otherLabId, GpuServerFixtures.gpuServerCreationRequest());

        ExtractableResponse<Response> response =
                Job_예약(otherLabId, JobFixtures.jobCreationRequest(otherLabServerId), userToken);
        assertThat((String) response.body().jsonPath().get("message"))
                .isEqualTo("접근 권한이 없는 사용자 입니다.");
    }

    @DisplayName("일반 사용자는 같은 랩의 다른 사용자의 Job 예약을 취소할 수 없다.")
    @Test
    void userCancelJobWithoutPermission() {
        String otherEmail = "other@other.com";
        String otherPassword = "otherPassword";

        String otherToken = AuthAcceptanceTest.회원_등록_및_로그인_후_토큰_발급(
                MemberFixtures.userCreationRequest(labId, otherEmail, otherPassword));

        Long otherMemberJobId = Job_예약_후_id_반환(labId, JobFixtures.jobCreationRequest(serverId), otherToken);

        ExtractableResponse<Response> response = Job_취소(labId, otherMemberJobId, userToken);
        assertThat((String) response.body().jsonPath().get("message"))
                .isEqualTo("접근 권한이 없는 회원입니다.");
    }

    @DisplayName("관리자는 같은 랩의 다른 사용자가 작성한 Job을 예약 취소할 수 있다.")
    @Test
    void managerCancelJob() {
        Long jobIdOfUser = Job_예약_후_id_반환(labId, JobFixtures.jobCreationRequest(serverId), userToken);

        Job_취소(labId, jobIdOfUser, managerToken);

        JobResponse job = Job_Id로_검색(labId, jobIdOfUser, userToken).body().as(JobResponse.class);
        Assertions.assertThat(job.getStatus()).isEqualTo(JobStatus.CANCELED);
    }

    @DisplayName("서버를 기준으로 작업 목록을 조회할 때 url path의 labId와 serverId를 검증한다.")
    @Test
    void findJobsByServerWithMeaninglessLabId() {
        Long meaninglessId = Long.MAX_VALUE;

        ExtractableResponse<Response> response = Job_목록_serverId로_검색(meaninglessId, serverId, userToken);
        assertThat(response.statusCode()).isNotEqualTo(HttpStatus.OK.value());
    }

    @DisplayName("Job을 수정한다.")
    @Test
    void updateJob() {
        Long jobIdOfUser = Job_예약_후_id_반환(labId, JobFixtures.jobCreationRequest(serverId), userToken);

        JobUpdateRequest jobUpdateRequest = JobFixtures.jobUpdateRequest();
        Job_수정(labId, jobIdOfUser, jobUpdateRequest, managerToken);

        JobResponse job = Job_Id로_검색(labId, jobIdOfUser, userToken).body().as(JobResponse.class);
        Assertions.assertThat(job.getName()).isEqualTo(jobUpdateRequest.getName());
    }
}
