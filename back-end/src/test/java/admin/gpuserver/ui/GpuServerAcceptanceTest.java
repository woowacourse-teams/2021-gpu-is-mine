package admin.gpuserver.ui;

import static admin.auth.AuthAcceptanceTest.회원_등록_및_로그인_후_토큰_발급;
import static admin.member.fixture.MemberFixtures.managerCreationRequest;
import static admin.member.fixture.MemberFixtures.userCreationRequest;
import static org.assertj.core.api.Assertions.assertThat;

import admin.AcceptanceTest;
import admin.gpuserver.dto.request.GpuBoardRequest;
import admin.gpuserver.dto.request.GpuServerRequest;
import admin.gpuserver.dto.request.GpuServerUpdateRequest;
import admin.gpuserver.dto.response.GpuBoardResponse;
import admin.gpuserver.dto.response.GpuServerResponse;
import admin.lab.dto.LabRequest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

@DisplayName("GpuServer 관련 API 테스트")
public class GpuServerAcceptanceTest extends AcceptanceTest {

    static Long labId;
    static List<Long> GpuServerIds;

    public static ExtractableResponse<Response> GpuServer_아이디조회(String token, Long labId, Long gpuServerId) {
        return RestAssured
                .given().log().all()
                .auth()
                .oauth2(token)
                .when().get("/api/labs/" + labId + "/gpus/" + gpuServerId)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> GpuServer_전체조회(String token, Long labId) {
        return RestAssured
                .given().log().all()
                .auth()
                .oauth2(token)
                .when().get("/api/labs/" + labId + "/gpus/")
                .then().log().all()
                .extract();
    }

    public static int GpuServer_전체조회갯수(String token, Long labId) {
        ExtractableResponse<Response> response = GpuServer_전체조회(token, labId);
        List<GpuServerResponse> gpus = response.jsonPath()
                .getList("gpuServers", GpuServerResponse.class);
        return gpus.size();
    }

    public static ExtractableResponse<Response> GpuServer_생성(String token, Long labId,
            GpuServerRequest gpuServerRequest) {
        return RestAssured
                .given().log().all()
                .auth()
                .oauth2(token)
                .body(gpuServerRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when().post("/api/labs/" + labId + "/gpus")
                .then().log().all()
                .extract();
    }

    public static Long GpuServer_생성후아이디찾기(String token, Long labId, GpuServerRequest gpuServerRequest) {
        ExtractableResponse<Response> response = GpuServer_생성(token, labId, gpuServerRequest);

        String[] locationPaths = response.header("Location").split("/");
        return Long.parseLong(locationPaths[locationPaths.length - 1]);
    }

    public static ExtractableResponse<Response> GpuServer_이름변경(String token,
            GpuServerUpdateRequest gpuServerNameUpdateRequest,
            Long gpuServerId) {
        return RestAssured
                .given().log().all()
                .auth()
                .oauth2(token)
                .body(gpuServerNameUpdateRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when().put("/api/labs/1/gpus/" + gpuServerId)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> GpuServer_삭제(String token, Long gpuServerId) {
        return RestAssured
                .given().log().all()
                .auth()
                .oauth2(token)
                .when().delete("/api/labs/1/gpus/" + gpuServerId)
                .then().log().all()
                .extract();
    }

    public static Long lab_생성(LabRequest labRequest) {
        ExtractableResponse<Response> response = RestAssured
                .given().log().all()
                .body(labRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when().post("/api/labs/")
                .then().log().all()
                .extract();

        String[] locationPaths = response.header("Location").split("/");
        return Long.parseLong(locationPaths[locationPaths.length - 1]);
    }

    String userToken;
    String managerToken;

    @BeforeEach
    public void setUp() {
        super.setUp();

        labId = lab_생성(new LabRequest("testLab"));

        userToken = 회원_등록_및_로그인_후_토큰_발급(userCreationRequest(labId));
        managerToken = 회원_등록_및_로그인_후_토큰_발급(managerCreationRequest(labId));

        List<GpuServerRequest> gpuServerRequests = Arrays.asList(
                new GpuServerRequest("추가서버1", 1024L, 1024L, new GpuBoardRequest("추가보드1", 800L)),
                new GpuServerRequest("추가서버2", 1024L, 1024L, new GpuBoardRequest("추가보드2", 800L))
        );

        GpuServerIds = gpuServerRequests.stream().map(
                request -> GpuServer_생성후아이디찾기(managerToken, labId, request)
        ).collect(Collectors.toList());
    }

    @DisplayName("GpuServer 개별조회")
    @Test
    void findGpuServer() {
        ExtractableResponse<Response> response = GpuServer_아이디조회(managerToken, labId, 1L);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        Assertions.assertThat(response.jsonPath().getObject("gpuBoard", GpuBoardResponse.class))
                .isNotNull();
    }

    @DisplayName("GpuServer 전체조회")
    @Test
    void findGpuServers() {
        ExtractableResponse<Response> response = GpuServer_전체조회(managerToken, labId);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.jsonPath().getList("gpuServers", GpuServerResponse.class))
                .hasSize(GpuServerIds.size());
    }

    @DisplayName("GpuServer 생성")
    @Test
    void saveGpuServer() {
        // given
        GpuBoardRequest gpuBoardRequest = new GpuBoardRequest("추가보드1", 800L);
        GpuServerRequest gpuServerRequest = new GpuServerRequest("추가서버1", 1024L, 1024L, gpuBoardRequest);

        // when
        ExtractableResponse<Response> response = GpuServer_생성(managerToken, labId, gpuServerRequest);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(response.header("Location")).isNotNull();
    }

    @DisplayName("GpuServer 이름수정")
    @Test
    void modifyGpuServer() {
        // given
        GpuBoardRequest gpuBoardRequest = new GpuBoardRequest("추가보드1", 800L);
        GpuServerRequest gpuServerRequest = new GpuServerRequest("추가서버1", 1024L, 1024L,
                gpuBoardRequest);
        Long gpuServerId = GpuServer_생성후아이디찾기(managerToken, labId, gpuServerRequest);

        // when
        GpuServerUpdateRequest gpuServerNameUpdateRequest = new GpuServerUpdateRequest("서버이름변경");
        ExtractableResponse<Response> response = GpuServer_이름변경(managerToken, gpuServerNameUpdateRequest,
                gpuServerId);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    @DisplayName("GpuServer 삭제")
    @Test
    void deleteGpuServer() {
        // given
        int previousCount = GpuServer_전체조회갯수(managerToken, labId);
        GpuServerRequest gpuServerRequest =
                new GpuServerRequest("추가서버1", 1024L, 1024L, new GpuBoardRequest("추가보드1", 800L));
        Long gpuServerId = GpuServer_생성후아이디찾기(managerToken, labId, gpuServerRequest);

        int addedCount = GpuServer_전체조회갯수(managerToken, labId);
        assertThat(addedCount).isEqualTo(previousCount + 1);

        // when
        ExtractableResponse<Response> response = GpuServer_삭제(managerToken, gpuServerId);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
        int afterDeletedCount = GpuServer_전체조회갯수(managerToken, labId);
        assertThat(afterDeletedCount).isEqualTo(previousCount);
    }
}
