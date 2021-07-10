package admin.gpuserver.ui;

import admin.AcceptanceTest;
import admin.gpuserver.dto.request.GpuBoardRequest;
import admin.gpuserver.dto.request.GpuServerNameUpdateRequest;
import admin.gpuserver.dto.request.GpuServerRequest;
import admin.gpuserver.dto.response.GpuBoardResponse;
import admin.gpuserver.dto.response.GpuServerResponse;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("GpuServer 관련 API 테스트 - labId: 1")
public class GpuServerAcceptanceTest extends AcceptanceTest {

    public static ExtractableResponse<Response> GpuServer_아이디조회(Long gpuServerId) {
        return RestAssured
                .given().log().all()
                .when().get("/api/labs/1/gpus/" + gpuServerId)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> GpuServer_전체조회() {
        return RestAssured
                .given().log().all()
                .when().get("/api/labs/1/gpus")
                .then().log().all()
                .extract();
    }

    public static int GpuServer_전체조회갯수() {
        ExtractableResponse<Response> response = RestAssured
                .given().log().all()
                .when().get("/api/labs/1/gpus")
                .then().log().all()
                .extract();

        List<GpuServerResponse> gpus = response.jsonPath().getList("gpus", GpuServerResponse.class);
        return gpus.size();
    }

    public static ExtractableResponse<Response> GpuServer_생성(GpuServerRequest gpuServerRequest) {
        return RestAssured
                .given().log().all()
                .body(gpuServerRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when().post("/api/labs/1/gpus")
                .then().log().all()
                .extract();
    }

    public static String GpuServer_생성후아이디찾기(GpuServerRequest gpuServerRequest) {
        ExtractableResponse<Response> response = RestAssured
                .given().log().all()
                .body(gpuServerRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when().post("/api/labs/1/gpus")
                .then().log().all()
                .extract();

        String[] locationPaths = response.header("Location").split("/");
        String id = locationPaths[locationPaths.length - 1];

        return id;
    }

    public static ExtractableResponse<Response> GpuServer_이름변경(GpuServerNameUpdateRequest gpuServerNameUpdateRequest, String gpuServerId) {
        return RestAssured
                .given().log().all()
                .body(gpuServerNameUpdateRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when().put("/api/labs/1/gpus/" + gpuServerId)
                .then().log().all()
                .extract();
    }

    public static ExtractableResponse<Response> GpuServer_삭제(String gpuServerId) {
        return RestAssured
                .given().log().all()
                .when().delete("/api/labs/1/gpus/" + gpuServerId)
                .then().log().all()
                .extract();
    }

    @DisplayName("GpuServer 개별조회")
    @Test
    void findGpuServer() {
        ExtractableResponse<Response> response = GpuServer_아이디조회(1L);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.jsonPath().getList("jobs")).hasSize(3);
        assertThat(response.jsonPath().getObject("gpuBoard", GpuBoardResponse.class))
                .isNotNull();
    }

    @DisplayName("GpuServer 전체조회")
    @Test
    void findGpuServers() {
        ExtractableResponse<Response> response = GpuServer_전체조회();

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.jsonPath().getList("gpus", GpuServerResponse.class)).hasSize(2);
    }

    @DisplayName("GpuServer 생성")
    @Test
    void saveGpuServer() {
        // given
        GpuBoardRequest gpuBoardRequest = new GpuBoardRequest("추가보드1", 800L);
        GpuServerRequest gpuServerRequest = new GpuServerRequest("추가서버1", 1024L, 1024L, gpuBoardRequest);

        // when
        ExtractableResponse<Response> response = GpuServer_생성(gpuServerRequest);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(response.header("Location")).isNotNull();
    }

    @DisplayName("GpuServer 이름수정")
    @Test
    void modifyGpuServer() {
        // given
        GpuBoardRequest gpuBoardRequest = new GpuBoardRequest("추가보드1", 800L);
        GpuServerRequest gpuServerRequest = new GpuServerRequest("추가서버1", 1024L, 1024L, gpuBoardRequest);
        String gpuServerId = GpuServer_생성후아이디찾기(gpuServerRequest);

        // when
        GpuServerNameUpdateRequest gpuServerNameUpdateRequest = new GpuServerNameUpdateRequest("서버이름변경");
        ExtractableResponse<Response> response = GpuServer_이름변경(gpuServerNameUpdateRequest, gpuServerId);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    @DisplayName("GpuServer 삭제")
    @Test
    void deleteGpuServer() {
        // given
        int previousCount = GpuServer_전체조회갯수();
        GpuBoardRequest gpuBoardRequest = new GpuBoardRequest("추가보드1", 800L);
        GpuServerRequest gpuServerRequest = new GpuServerRequest("추가서버1", 1024L, 1024L, gpuBoardRequest);
        String gpuServerId = GpuServer_생성후아이디찾기(gpuServerRequest);
        int addedCount = GpuServer_전체조회갯수();
        assertThat(addedCount).isEqualTo(previousCount + 1);

        // when
        ExtractableResponse<Response> response = GpuServer_삭제(gpuServerId);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
        int afterDeletedCount = GpuServer_전체조회갯수();
        assertThat(afterDeletedCount).isEqualTo(previousCount);
    }
}
