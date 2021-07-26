package admin.job.ui;

import static admin.gpuserver.fixture.GpuServerFixtures.gpuServerCreationRequest;
import static admin.gpuserver.ui.GpuServerAcceptanceTest.GpuServer_생성후아이디찾기;
import static admin.job.fixture.JobFixtures.jobCreationRequest;
import static admin.lab.ui.LabAcceptanceTest.LAB_생성_요청_후_생성_ID_리턴;
import static admin.member.fixture.MemberFixtures.managerCreationRequest;
import static admin.member.fixture.MemberFixtures.userCreationRequest;
import static admin.member.ui.MemberAcceptanceTest.MEMBER_생성_요청_후_생성_ID_리턴;
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
    private Long memberId;
    private Long serverId;

    public static List<Long> Job_목록_serverId로_검색_후_ids_추출(Long memberId, Long labId, Long serverId) {
        ExtractableResponse<Response> response = Job_목록_serverId로_검색(memberId, labId, serverId);
        return extractIdsFromJobResponses(response);
    }

    public static ExtractableResponse<Response> Job_목록_serverId로_검색(Long memberId, Long labId, Long serverId) {
        return RestAssured.given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/labs/" + labId + "/gpus/" + serverId + "/jobs?memberId=" + memberId)
                .then()
                .extract();
    }

    public static List<Long> Job_목록_labId로_검색_후_ids_추출(Long memberId, Long labId) {
        ExtractableResponse<Response> response = Job_목록_labId로_검색(memberId, labId);
        return extractIdsFromJobResponses(response);
    }

    public static ExtractableResponse<Response> Job_목록_labId로_검색(Long memberId, Long labId) {
        return RestAssured.given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/labs/" + labId + "/jobs?memberId=" + memberId)
                .then()
                .extract();
    }

    public static List<Long> Job_목록_멤버Id로_검색_후_ids_추출(Long memberId) {
        ExtractableResponse<Response> response = Job_목록_멤버Id로_검색(memberId);
        return extractIdsFromJobResponses(response);
    }

    public static ExtractableResponse<Response> Job_목록_멤버Id로_검색(Long memberId) {
        return RestAssured.given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/members/me/jobs" + "?memberId=" + memberId)
                .then()
                .extract();
    }

    public static ExtractableResponse<Response> Job_Id로_검색(Long memberId, Long jobId) {
        return RestAssured.given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/jobs/" + jobId + "?memberId=" + memberId)
                .then()
                .extract();
    }

    public static ExtractableResponse<Response> Job_취소(Long memberId, Long jobId) {
        return RestAssured.given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .put("/api/jobs/" + jobId + "?memberId=" + memberId)
                .then()
                .extract();
    }

    public static ExtractableResponse<Response> Job_예약(Long memberId, JobRequest jobRequest) {
        return RestAssured.given()
                .body(jobRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .post("/api/jobs?memberId=" + memberId)
                .then()
                .extract();
    }

    public static Long Job_예약_후_id_반환(Long memberId, JobRequest jobRequest) {
        ExtractableResponse<Response> response = Job_예약(memberId, jobRequest);
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
        memberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(labId));
        serverId = GpuServer_생성후아이디찾기(labId, gpuServerCreationRequest());
    }

    private List<Long> Job_예약_목록_생성_후_ids_반환(int numberOfJobs) {
        return LongStream.range(0, numberOfJobs)
                .mapToObj(i -> Job_예약_후_id_반환(memberId, jobCreationRequest(serverId)))
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
            Long jobId = Job_예약_후_id_반환(memberId, jobCreationRequest(serverId));
            assertThat(jobId).isNotNull();
        }

        @DisplayName("소속되지 않는 lab에 job을 예약할 수 없다.")
        @Test
        void addJobWithoutPermission() {
            Long otherLabId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("otherLabId"));
            Long otherLabServerId = GpuServer_생성후아이디찾기(otherLabId, gpuServerCreationRequest());

            ExtractableResponse<Response> response = Job_예약(memberId, jobCreationRequest(otherLabServerId));
            접근_권한이_없는_회원_응답_확인(response);
        }
    }

    @Nested
    @DisplayName("Job을 예약 취소한다.")
    class CancelJob {
        Long otherLabId;
        Long otherLabServerId;
        Long otherLabMemberId;

        @BeforeEach
        void setUp() {
            otherLabId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab2"));
            otherLabServerId = GpuServer_생성후아이디찾기(otherLabId, gpuServerCreationRequest());
            otherLabMemberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(otherLabId));
        }

        @DisplayName("Job 예약을 취소한다.")
        @Test
        void cancelJob() {
            Long jobId = Job_예약_후_id_반환(memberId, jobCreationRequest(serverId));

            Job_취소(memberId, jobId);

            JobResponse jobResponse = Job_Id로_검색(memberId, jobId).body().as(JobResponse.class);
            assertThat(jobResponse.getStatus()).isEqualTo(JobStatus.CANCELED);
        }

        @DisplayName("일반 사용자는 본인 작성한 Job만 예약 취소할 수 있다.")
        @Test
        void userCancelJobWithoutPermission() {
            Long otherMemberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(labId));
            Long otherMemberJobId = Job_예약_후_id_반환(otherMemberId, jobCreationRequest(serverId));

            ExtractableResponse<Response> response = Job_취소(memberId, otherMemberJobId);
            접근_권한이_없는_회원_응답_확인(response);
        }

        @DisplayName("관리자는 같은 랩의 다른 사용자가 작성한 Job을 예약 취소할 수 있다.")
        @Test
        void managerCancelJob() {
            Long managerId = MEMBER_생성_요청_후_생성_ID_리턴(managerCreationRequest(labId));

            Long otherMemberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(labId));
            Long otherMemberJobId = Job_예약_후_id_반환(otherMemberId, jobCreationRequest(serverId));

            Job_취소(managerId, otherMemberJobId);

            JobResponse job = Job_Id로_검색(managerId, otherMemberJobId).body().as(JobResponse.class);
            assertThat(job.getStatus()).isEqualTo(JobStatus.CANCELED);
        }

        @DisplayName("관리자는 다른 랩의 Job을 예약 취소할 수 없다.")
        @Test
        void managerCancelJobWithoutPermission() {
            Long managerId = MEMBER_생성_요청_후_생성_ID_리턴(managerCreationRequest(labId));

            Long otherLabJobId = Job_예약_후_id_반환(otherLabMemberId, jobCreationRequest(otherLabServerId));

            ExtractableResponse<Response> response = Job_취소(managerId, otherLabJobId);
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
            Long jobId = Job_예약_후_id_반환(memberId, jobRequest);

            JobResponse job = Job_Id로_검색(memberId, jobId).body().as(JobResponse.class);

            assertThat(job.getId()).isEqualTo(jobId);
            assertThat(job.getName()).isEqualTo(jobRequest.getName());
            assertThat(job.getStatus()).isEqualTo(JobStatus.WAITING);
        }

        @DisplayName("사용자를 기준으로 Job을 조회한다.")
        @Test
        void findJobsByMember() {
            List<Long> ids = Job_예약_목록_생성_후_ids_반환(numberOfJobs);
            List<Long> searchedIds = Job_목록_멤버Id로_검색_후_ids_추출(memberId);

            assertThat(searchedIds).usingRecursiveComparison().isEqualTo(ids);
        }

        @DisplayName("lab를 기준으로 Job을 조회한다.")
        @Test
        void findJobsByLab() {
            List<Long> ids = Job_예약_목록_생성_후_ids_반환(numberOfJobs);
            List<Long> searchedIds = Job_목록_labId로_검색_후_ids_추출(memberId, labId);

            assertThat(searchedIds).usingRecursiveComparison().isEqualTo(ids);
        }

        @DisplayName("서버를 기준으로 작업 목록을 확인할 수 있다.")
        @Test
        void findJobsByServer() {
            List<Long> ids = Job_예약_목록_생성_후_ids_반환(numberOfJobs);
            List<Long> searchedIds = Job_목록_serverId로_검색_후_ids_추출(memberId, labId, serverId);

            assertThat(searchedIds).usingRecursiveComparison().isEqualTo(ids);
        }

        @Disabled
        @DisplayName("서버를 기준으로 작업 목록을 조회할 때 url path의 labId와 serverId를 검증한다.")
        @Test
        void findJobsByServerWithMeaninglessLabId() {
            Long meaninglessId = Long.MAX_VALUE;

            ExtractableResponse<Response> response = Job_목록_serverId로_검색(memberId, meaninglessId, serverId);
            assertThat(response.statusCode()).isNotEqualTo(HttpStatus.OK.value());
        }
    }

    @Nested
    @DisplayName("자신이 속하지 않은 lab의 작업 목록을 확인한다. (member별, server별, lab별)")
    class FindJobsInOtherLab {

        Long otherLabId;
        Long otherMemberId;
        Long otherLabServerId;
        Long otherLabJob;

        @BeforeEach
        void setUp() {
            otherLabId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab2"));
            otherMemberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(otherLabId));
            otherLabServerId = GpuServer_생성후아이디찾기(otherLabId, gpuServerCreationRequest());
            otherLabJob = Job_예약_후_id_반환(otherMemberId, jobCreationRequest(otherLabServerId));
        }

        @DisplayName("사용자는 다른 랩의 작업을 조회할 수 없다.")
        @Test
        void findByIdWithoutPermission() {
            ExtractableResponse<Response> response = Job_Id로_검색(memberId, otherLabJob);
            접근_권한이_없는_회원_응답_확인(response);
        }

        @DisplayName("다른 lab의 작업 목록을 확인할 수 없다.")
        @Test
        void findJobsByLabWithoutPermission() {
            ExtractableResponse<Response> response = Job_목록_labId로_검색(memberId, otherLabId);
            접근_권한이_없는_회원_응답_확인(response);
        }

        @DisplayName("사용자의 랩이 아닌 다른 랩의 서버를 기준으로 작업 목록을 확인할 수 없다.")
        @Test
        void findJobsByServerWithoutPermission() {
            ExtractableResponse<Response> response = Job_목록_serverId로_검색(memberId, otherLabId, otherLabServerId);
            접근_권한이_없는_회원_응답_확인(response);
        }
    }
}
