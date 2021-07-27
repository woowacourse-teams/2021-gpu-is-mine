package admin.job.ui;

import static admin.auth.AuthAcceptanceTest.회원_등록_및_로그인_후_토큰_발급;
import static admin.gpuserver.fixture.GpuServerFixtures.gpuServerCreationRequest;
import static admin.gpuserver.ui.GpuServerAcceptanceTest.GpuServer_생성후아이디찾기;
import static admin.job.fixture.JobFixtures.jobCreationRequest;
import static admin.lab.ui.LabAcceptanceTest.LAB_생성_요청_후_생성_ID_리턴;
import static admin.member.fixture.MemberFixtures.managerCreationRequest;
import static admin.member.fixture.MemberFixtures.userCreationRequest;
import static org.assertj.core.api.Assertions.assertThat;

import admin.AcceptanceTest;
import admin.job.domain.JobStatus;
import admin.job.dto.request.JobRequest;
import admin.job.dto.response.JobResponse;
import admin.job.dto.response.JobResponses;
import admin.lab.dto.LabRequest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.LongStream;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

class JobAcceptanceTest extends AcceptanceTest {

    private Long labId;
    private Long serverId;
    private String userToken;
    private String managerToken;

    public static List<Long> Job_목록_serverId로_검색_후_ids_추출(Long labId, Long serverId, String accessToken) {
        ExtractableResponse<Response> response = Job_목록_serverId로_검색(labId, serverId, accessToken);
        return extractIdsFromJobResponses(response);
    }

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

    public static List<Long> Job_목록_labId로_검색_후_ids_추출(Long labId, String accessToken) {
        ExtractableResponse<Response> response = Job_목록_labId로_검색(labId, accessToken);
        return extractIdsFromJobResponses(response);
    }

    public static ExtractableResponse<Response> Job_목록_labId로_검색(Long labId, String accessToken) {
        return RestAssured.given()
                .auth()
                .oauth2((accessToken))
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/labs/" + labId + "/jobs")
                .then()
                .extract();
    }

    public static List<Long> JOB_목록_토큰_사용자_검색(Long labId, String accessToken) {
        ExtractableResponse<Response> response = Job_목록_멤버Id로_검색(labId, accessToken);
        return extractIdsFromJobResponses(response);
    }

    public static ExtractableResponse<Response> Job_목록_멤버Id로_검색(Long labId, String accessToken) {
        return RestAssured.given()
                .auth()
                .oauth2(accessToken)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/labs/" + labId + "/jobs/me")
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
                .put("/api/labs/" + labId + "/jobs/" + jobId)
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

    public static Long Job_예약_후_id_반환(Long labId, JobRequest jobRequest, String accessToken) {
        ExtractableResponse<Response> response = Job_예약(labId, jobRequest, accessToken);
        return extractCreatedId(response.header("location"));
    }

    private static Long extractCreatedId(String uri) {
        String[] uriToken = uri.split("/");
        return Long.valueOf(uriToken[uriToken.length - 1]);
    }

    private static List<Long> extractIdsFromJobResponses(ExtractableResponse<Response> response) {
        JobResponses searched = response.body().as(JobResponses.class);
        return searched.getJobResponses().stream()
                .map(JobResponse::getId)
                .collect(Collectors.toList());
    }

    @Override
    @BeforeEach
    public void setUp() {
        super.setUp();

        labId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab"));

        userToken = 회원_등록_및_로그인_후_토큰_발급(userCreationRequest(labId));
        managerToken = 회원_등록_및_로그인_후_토큰_발급(managerCreationRequest(labId));

        serverId = GpuServer_생성후아이디찾기(labId, gpuServerCreationRequest());
    }

    private List<Long> Job_예약_목록_생성_후_ids_반환(int numberOfJobs) {
        return LongStream.range(0, numberOfJobs)
                .mapToObj(i -> Job_예약_후_id_반환(labId, jobCreationRequest(serverId), userToken))
                .collect(Collectors.toList());
    }

    private void 접근_권한이_없는_회원_응답_확인(ExtractableResponse<Response> response) {
        assertThat((String) response.body().jsonPath().get("message"))
                .isEqualTo("접근 권한이 없는 회원입니다.");
    }

    @Nested
    @DisplayName("Job을 예약한다.")
    class ReserveJob {
        @DisplayName("Job 예약")
        @Test
        void addJob() {
            Long jobId = Job_예약_후_id_반환(labId, jobCreationRequest(serverId), userToken);
            assertThat(jobId).isNotNull();
        }

        @Disabled
        @DisplayName("소속되지 않는 lab에 job을 예약할 수 없다.")
        @Test
        void addJobWithoutPermission() {
            Long otherLabId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("otherLabId"));
            Long otherLabServerId = GpuServer_생성후아이디찾기(otherLabId, gpuServerCreationRequest());

            ExtractableResponse<Response> response =
                    Job_예약(otherLabId, jobCreationRequest(otherLabServerId), userToken);
            접근_권한이_없는_회원_응답_확인(response);
        }
    }

    @Nested
    @DisplayName("Job을 예약 취소한다.")
    class CancelJob {
        Long otherLabId;
        Long otherLabServerId;
        String otherLabUserToken;

        @BeforeEach
        void setUp() {
            otherLabId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab2"));
            otherLabServerId = GpuServer_생성후아이디찾기(otherLabId, gpuServerCreationRequest());
            otherLabUserToken = 회원_등록_및_로그인_후_토큰_발급(userCreationRequest(otherLabId, "other@other.com", "password"));
        }

        @DisplayName("Job 예약을 취소한다.")
        @Test
        void cancelJob() {
            Long jobId = Job_예약_후_id_반환(labId, jobCreationRequest(serverId), userToken);

            Job_취소(labId, jobId, userToken);

            JobResponse jobResponse = Job_Id로_검색(labId, jobId, userToken).body().as(JobResponse.class);
            assertThat(jobResponse.getStatus()).isEqualTo(JobStatus.CANCELED);
        }

        @Disabled
        @DisplayName("일반 사용자는 같은 랩의 다른 사용자의 Job 예약을 취소할 수 없다.")
        @Test
        void userCancelJobWithoutPermission() {
            String otherEmail = "other@other.com";
            String otherPassword = "otherPassword";

            String otherToken = 회원_등록_및_로그인_후_토큰_발급(userCreationRequest(labId, otherEmail, otherPassword));

            Long otherMemberJobId = Job_예약_후_id_반환(labId, jobCreationRequest(serverId), otherToken);

            ExtractableResponse<Response> response = Job_취소(labId, otherMemberJobId, userToken);
            접근_권한이_없는_회원_응답_확인(response);
        }

        @DisplayName("관리자는 같은 랩의 다른 사용자가 작성한 Job을 예약 취소할 수 있다.")
        @Test
        void managerCancelJob() {
            Long jobIdOfUser = Job_예약_후_id_반환(labId, jobCreationRequest(serverId), userToken);

            Job_취소(labId, jobIdOfUser, managerToken);

            JobResponse job = Job_Id로_검색(labId, jobIdOfUser, userToken).body().as(JobResponse.class);
            assertThat(job.getStatus()).isEqualTo(JobStatus.CANCELED);
        }

        @DisplayName("관리자는 다른 랩의 Job을 예약 취소할 수 없다.")
        @Test
        void managerCancelJobWithoutPermission() {
            Long otherLabJobId = Job_예약_후_id_반환(otherLabId, jobCreationRequest(otherLabServerId), otherLabUserToken);

            ExtractableResponse<Response> response = Job_취소(otherLabId, otherLabJobId, managerToken);
            접근_권한이_없는_회원_응답_확인(response);
        }
    }

    @Nested
    @DisplayName("자신이 속한 lab의 작업 목록을 확인한다. (member별, server별, lab별)")
    class FindJobs {

        private int numberOfJobs = 3;

        @DisplayName("Job Id로 Job을 조회한다.")
        @Test
        void findById() {
            JobRequest jobRequest = jobCreationRequest(serverId);
            Long jobId = Job_예약_후_id_반환(labId, jobRequest, userToken);

            JobResponse job = Job_Id로_검색(labId, jobId, userToken).body().as(JobResponse.class);

            assertThat(job.getId()).isEqualTo(jobId);
            assertThat(job.getName()).isEqualTo(jobRequest.getName());
            assertThat(job.getStatus()).isEqualTo(JobStatus.WAITING);
        }

        @DisplayName("사용자를 기준으로 Job을 조회한다.")
        @Test
        void findJobsByMember() {
            List<Long> ids = Job_예약_목록_생성_후_ids_반환(numberOfJobs);
            List<Long> searchedIds = JOB_목록_토큰_사용자_검색(labId, userToken);

            assertThat(searchedIds).usingRecursiveComparison().isEqualTo(ids);
        }

        @DisplayName("lab를 기준으로 Job을 조회한다.")
        @Test
        void findJobsByLab() {
            List<Long> ids = Job_예약_목록_생성_후_ids_반환(numberOfJobs);
            List<Long> searchedIds = Job_목록_labId로_검색_후_ids_추출(labId, userToken);

            assertThat(searchedIds).usingRecursiveComparison().isEqualTo(ids);
        }

        @DisplayName("서버를 기준으로 작업 목록을 확인할 수 있다.")
        @Test
        void findJobsByServer() {
            List<Long> ids = Job_예약_목록_생성_후_ids_반환(numberOfJobs);
            List<Long> searchedIds = Job_목록_serverId로_검색_후_ids_추출(labId, serverId, userToken);

            assertThat(searchedIds).usingRecursiveComparison().isEqualTo(ids);
        }

//        @Disabled
        @DisplayName("서버를 기준으로 작업 목록을 조회할 때 url path의 labId와 serverId를 검증한다.")
        @Test
        void findJobsByServerWithMeaninglessLabId() {
            Long meaninglessId = Long.MAX_VALUE;

            ExtractableResponse<Response> response = Job_목록_serverId로_검색(meaninglessId, serverId, userToken);
            assertThat(response.statusCode()).isNotEqualTo(HttpStatus.OK.value());
        }
    }

    @Nested
    @DisplayName("자신이 속하지 않은 lab의 작업 목록을 확인한다. (member별, server별, lab별)")
    class FindJobsInOtherLab {

        Long otherLabId;
        Long otherLabServerId;
        String otherLabUserToken;
        Long otherLabJob;


        @BeforeEach
        void setUp() {
            otherLabId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab2"));
            otherLabServerId = GpuServer_생성후아이디찾기(otherLabId, gpuServerCreationRequest());
            otherLabUserToken = 회원_등록_및_로그인_후_토큰_발급(userCreationRequest(otherLabId, "other@other.com", "password"));
            otherLabJob = Job_예약_후_id_반환(otherLabId, jobCreationRequest(otherLabServerId), otherLabUserToken);
        }


        @DisplayName("사용자는 다른 랩의 작업을 조회할 수 없다.")
        @Test
        void findByIdWithoutPermission() {
            ExtractableResponse<Response> response = Job_Id로_검색(otherLabId, otherLabJob, userToken);
            접근_권한이_없는_회원_응답_확인(response);
        }

        @DisplayName("다른 lab의 작업 목록을 확인할 수 없다.")
        @Test
        void findJobsByLabWithoutPermission() {
            ExtractableResponse<Response> response = Job_목록_labId로_검색(otherLabId, userToken);
            접근_권한이_없는_회원_응답_확인(response);
        }

        @DisplayName("사용자의 랩이 아닌 다른 랩의 서버를 기준으로 작업 목록을 확인할 수 없다.")
        @Test
        void findJobsByServerWithoutPermission() {
            ExtractableResponse<Response> response = Job_목록_serverId로_검색(otherLabId, otherLabServerId, userToken);
            접근_권한이_없는_회원_응답_확인(response);
        }
    }
}
