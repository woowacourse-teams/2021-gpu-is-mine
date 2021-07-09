package admin.gpuserver.ui;

import admin.AcceptanceTest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("GpuServer 관련 API 테스트")
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
}
