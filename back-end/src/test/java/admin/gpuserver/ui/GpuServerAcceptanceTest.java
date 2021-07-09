package admin.gpuserver.ui;

import admin.AcceptanceTest;
import admin.gpuserver.dto.request.GpuBoardRequest;
import admin.gpuserver.dto.request.GpuServerRequest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

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

    public static ExtractableResponse<Response> GpuServer_생성(GpuServerRequest gpuServerRequest) {
        return RestAssured
                .given().log().all()
                .body(gpuServerRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when().post("/api/labs/1/gpus")
                .then().log().all()
                .extract();
    }

    @DisplayName("GpuServer 개별조회")
    @Test
    void findGpuServer() {
        ExtractableResponse<Response> response = GpuServer_아이디조회(1L);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }

    @DisplayName("GpuServer 전체조회")
    @Test
    void findGpuServers() {
        ExtractableResponse<Response> response = GpuServer_전체조회();

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
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
}
