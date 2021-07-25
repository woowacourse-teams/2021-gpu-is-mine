package admin.job.ui;

import static admin.gpuserver.fixture.gpuServerFixtures.gpuServerCreationRequest;
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
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

class JobAcceptanceTest extends AcceptanceTest {
    @Override
    @BeforeEach
    public void setUp() {
        super.setUp();
    }

    public static ExtractableResponse<Response> Job_목록_serverId로_검색(Long memberId, Long labId, Long serverId) {
        return RestAssured.given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/labs/" + labId + "/gpus/"+serverId+"/jobs?memberId=" + memberId)
                .then()
                .extract();
    }

    public static ExtractableResponse<Response> Job_목록_labId로_검색(Long memberId, Long labId) {
        return RestAssured.given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/labs/" + labId + "/jobs?memberId=" + memberId)
                .then()
                .extract();
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

    @DisplayName("Job 예약")
    @Test
    void addJob() {
        Long labId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab"));

        Long memberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(labId));
        Long serverId = GpuServer_생성후아이디찾기(labId, gpuServerCreationRequest());
        Long jobId = Job_예약_후_id_반환(memberId, jobCreationRequest(serverId));
        assertThat(jobId).isNotNull();
    }

    @DisplayName("랩에 권한이 없는 사람은 Job을 예약할 수 없다.")
    @Test
    void addJobWithoutPermission() {
        Long baseLabId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("baseLabId"));
        Long memberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(baseLabId));

        Long otherLabId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("otherLabId"));
        Long otherLabServerId = GpuServer_생성후아이디찾기(otherLabId, gpuServerCreationRequest());

        ExtractableResponse<Response> response = Job_예약(memberId, jobCreationRequest(otherLabServerId));
        assertThat((String) response.body().jsonPath().get("message"))
                .isEqualTo("접근 권한이 없는 회원입니다.");
    }

    @DisplayName("Job 예약을 취소한다.")
    @Test
    void cancelJob() {
        Long labId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab"));

        Long memberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(labId));
        Long serverId = GpuServer_생성후아이디찾기(labId, gpuServerCreationRequest());
        Long jobId = Job_예약_후_id_반환(memberId, jobCreationRequest(serverId));

        Job_취소(memberId, jobId);

        ExtractableResponse<Response> response = Job_Id로_검색(memberId, jobId);
        JobResponse job = response.body().as(JobResponse.class);
        assertThat(job.getStatus()).isEqualTo(JobStatus.CANCELED);
    }

    @DisplayName("일반 사용자가 수정 권한이 없는 Job을 예약 취소 할 수 없다. ")
    @Test
    void userCancelJobWithoutPermission() {
        Long labId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab"));

        Long baseMemberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(labId));
        Long otherMemberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(labId));

        Long serverId = GpuServer_생성후아이디찾기(labId, gpuServerCreationRequest());
        Long jobId = Job_예약_후_id_반환(otherMemberId, jobCreationRequest(serverId));

        ExtractableResponse<Response> response = Job_취소(baseMemberId, jobId);
        assertThat((String) response.body().jsonPath().get("message"))
                .isEqualTo("접근 권한이 없는 회원입니다.");
    }

    @DisplayName("관리자는 같은 랩의 Job 예약을 취소할 수 있다.")
    @Test
    void managerCancelJob() {
        Long labId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab"));

        Long managerId = MEMBER_생성_요청_후_생성_ID_리턴(managerCreationRequest(labId));
        Long otherMemberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(labId));

        Long serverId = GpuServer_생성후아이디찾기(labId, gpuServerCreationRequest());
        Long jobId = Job_예약_후_id_반환(otherMemberId, jobCreationRequest(serverId));

        Job_취소(managerId, jobId);

        ExtractableResponse<Response> response = Job_Id로_검색(managerId, jobId);
        JobResponse job = response.body().as(JobResponse.class);
        assertThat(job.getStatus()).isEqualTo(JobStatus.CANCELED);
    }

    @DisplayName("관리자는 같은 랩의 Job에만 수정 권한을 갖는다.")
    @Test
    void managerCancelJobWithoutPermission() {
        Long labId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab1"));
        Long managerId = MEMBER_생성_요청_후_생성_ID_리턴(managerCreationRequest(labId));

        Long otherLabId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab2"));
        Long otherMemberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(otherLabId));
        Long otherLabServerId = GpuServer_생성후아이디찾기(otherLabId, gpuServerCreationRequest());
        Long otherLabJob = Job_예약_후_id_반환(otherMemberId, jobCreationRequest(otherLabServerId));

        Job_취소(managerId, otherLabJob);

        ExtractableResponse<Response> response = Job_취소(managerId, otherLabJob);
        assertThat((String) response.body().jsonPath().get("message"))
                .isEqualTo("접근 권한이 없는 회원입니다.");
    }

    @DisplayName("Job Id로 Job을 조회한다.")
    @Test
    void findById() {
        Long labId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab"));
        Long memberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(labId));
        Long serverId = GpuServer_생성후아이디찾기(labId, gpuServerCreationRequest());

        JobRequest jobRequest = jobCreationRequest(serverId);
        Long jobId = Job_예약_후_id_반환(memberId, jobRequest);

        ExtractableResponse<Response> response = Job_Id로_검색(memberId, jobId);
        JobResponse job = response.body().as(JobResponse.class);

        assertThat(job.getId()).isEqualTo(jobId);
        assertThat(job.getName()).isEqualTo(jobRequest.getName());
        assertThat(job.getStatus()).isEqualTo(JobStatus.WAITING);
    }

    @DisplayName("사용자는 다른 랩의 Job을 조회할 수 없다.")
    @Test
    void findByIdWithoutPermission() {
        Long labId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab1"));
        Long memberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(labId));

        Long otherLabId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab2"));
        Long otherMemberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(otherLabId));
        Long otherLabServerId = GpuServer_생성후아이디찾기(otherLabId, gpuServerCreationRequest());
        Long otherLabJob = Job_예약_후_id_반환(otherMemberId, jobCreationRequest(otherLabServerId));

        ExtractableResponse<Response> response = Job_Id로_검색(memberId, otherLabJob);
        assertThat((String) response.body().jsonPath().get("message"))
                .isEqualTo("접근 권한이 없는 회원입니다.");
    }

    @DisplayName("사용자를 기준으로 Job을 조회한다.")
    @Test
    void findJobsByMember() {
        Long labId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab"));
        Long memberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(labId));
        Long serverId = GpuServer_생성후아이디찾기(labId, gpuServerCreationRequest());

        List<Long> ids = LongStream.range(0, 3)
                .mapToObj(i -> Job_예약_후_id_반환(memberId, jobCreationRequest(serverId)))
                .collect(Collectors.toList());

        JobResponses searched = Job_목록_멤버Id로_검색(memberId).body().as(JobResponses.class);
        List<Long> searchedIds = searched.getJobResponses().stream()
                .map(JobResponse::getId)
                .collect(Collectors.toList());

        assertThat(searchedIds).usingRecursiveComparison().isEqualTo(ids);
    }

    @DisplayName("lab를 기준으로 Job을 조회한다.")
    @Test
    void findJobsByLab() {
        Long labId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab"));
        Long memberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(labId));
        Long serverId = GpuServer_생성후아이디찾기(labId, gpuServerCreationRequest());

        List<Long> ids = LongStream.range(0, 3)
                .mapToObj(i -> Job_예약_후_id_반환(memberId, jobCreationRequest(serverId)))
                .collect(Collectors.toList());

        JobResponses searched = Job_목록_labId로_검색(memberId,labId).body().as(JobResponses.class);
        List<Long> searchedIds = searched.getJobResponses().stream()
                .map(JobResponse::getId)
                .collect(Collectors.toList());

        assertThat(searchedIds).usingRecursiveComparison().isEqualTo(ids);
    }

    @DisplayName("다른 lab의 사용자가 lab의 작업 목록을 확인할 수 없다.")
    @Test
    void findJobsByLabWithoutPermission() {
        Long labId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab1"));

        Long otherLabId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab2"));
        Long otherMemberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(otherLabId));

        ExtractableResponse<Response> response = Job_목록_labId로_검색(otherMemberId, labId);
        assertThat((String) response.body().jsonPath().get("message"))
                .isEqualTo("접근 권한이 없는 회원입니다.");
    }

    @DisplayName("서버를 기준으로 작업 목록을 확인할 수 있다.")
    @Test
    void findJobsByServer() {
        Long labId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab"));
        Long memberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(labId));
        Long serverId = GpuServer_생성후아이디찾기(labId, gpuServerCreationRequest());

        List<Long> ids = LongStream.range(0, 3)
                .mapToObj(i -> Job_예약_후_id_반환(memberId, jobCreationRequest(serverId)))
                .collect(Collectors.toList());

        JobResponses searched = Job_목록_serverId로_검색(memberId, labId, serverId).body().as(JobResponses.class);
        List<Long> searchedIds = searched.getJobResponses().stream()
                .map(JobResponse::getId)
                .collect(Collectors.toList());

        assertThat(searchedIds).usingRecursiveComparison().isEqualTo(ids);
    }

    @DisplayName("사용자의 랩이 아닌 다른 랩의 서버를 기준으로 작업 목록을 확인할 수 없다.")
    @Test
    void findJobsByServerWithoutPermission() {
        Long labId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab"));
        Long serverId = GpuServer_생성후아이디찾기(labId, gpuServerCreationRequest());

        Long otherLabId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab2"));
        Long otherMemberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(otherLabId));

        ExtractableResponse<Response> response = Job_목록_serverId로_검색(otherMemberId, labId, serverId);
        assertThat((String) response.body().jsonPath().get("message"))
                .isEqualTo("접근 권한이 없는 회원입니다.");
    }

    @Disabled
    @DisplayName("서버를 기준으로 작업 목록을 조회할 때 url path의 labId와 serverId를 검증한다.")
    @Test
    void findJobsByServerWithMeaninglessLabId() {
        Long labId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("lab"));
        Long serverId = GpuServer_생성후아이디찾기(labId, gpuServerCreationRequest());
        Long memberId = MEMBER_생성_요청_후_생성_ID_리턴(userCreationRequest(labId));

        Long meaninglessId = Long.MAX_VALUE;

        ExtractableResponse<Response> response = Job_목록_serverId로_검색(memberId, meaninglessId, serverId);
        assertThat(response.statusCode()).isNotEqualTo(HttpStatus.OK.value());
    }
}
