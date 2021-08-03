package mine.is.gpu.lab.ui;

import static mine.is.gpu.member.fixture.MemberFixtures.managerCreationRequest;
import static org.assertj.core.api.Assertions.assertThat;

import mine.is.gpu.AcceptanceTest;
import mine.is.gpu.lab.dto.LabRequest;
import mine.is.gpu.lab.dto.LabResponse;
import mine.is.gpu.auth.AuthAcceptanceTest;
import mine.is.gpu.member.fixture.MemberFixtures;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

public class LabAcceptanceTest extends AcceptanceTest {
    private static final LabRequest LAB_REQUEST = new LabRequest("labName");
    private static final LabRequest LAB_REQUEST2 = new LabRequest("labName2");

    public static Long LAB_생성_요청_후_생성_ID_리턴(LabRequest labRequest) {
        return extractCreatedId(LAB_생성_요청(labRequest));
    }

    public static ExtractableResponse<Response> LAB_생성_요청(LabRequest labRequest) {
        return RestAssured.given()
                .body(labRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .post("/api/labs/")
                .then()
                .extract();
    }

    public static void LAB_정상_생성됨(ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(response.header("Location")).isNotBlank();
    }

    public static ExtractableResponse<Response> LAB_조회_요청(String accessToken, Long id) {
        return RestAssured.given()
                .auth()
                .oauth2(accessToken)
                .when()
                .get("/api/labs/" + id)
                .then()
                .extract();
    }

    public static void LAB_정상_조회됨(ExtractableResponse<Response> response, String expectedLabName) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        Assertions.assertThat(response.body()
                .as(LabResponse.class)
                .getName()).isEqualTo(expectedLabName);
    }

    public static ExtractableResponse<Response> LAB_목록_조회_요청() {
        return RestAssured.given()
                .when()
                .get("/api/labs/")
                .then()
                .extract();
    }

    public static ExtractableResponse<Response> LAB_수정_요청(String accessToken, Long id, LabRequest updateLabRequest) {
        return RestAssured.given()
                .auth()
                .oauth2(accessToken)
                .body(updateLabRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .put("/api/labs/" + id)
                .then()
                .extract();
    }

    public static ExtractableResponse<Response> LAB_삭제_요청(String accessToken, Long id) {
        return RestAssured.given()
                .auth()
                .oauth2(accessToken)
                .when()
                .delete("/api/labs/" + id)
                .then()
                .extract();
    }

    private static Long extractCreatedId(ExtractableResponse<Response> createResponse) {
        String uri = createResponse.header("Location");
        return extractCreatedId(uri);
    }

    private static Long extractCreatedId(String uri) {
        String[] uriToken = uri.split("/");
        return Long.valueOf(uriToken[uriToken.length - 1]);
    }

    @Test
    @DisplayName("Lab 생성")
    void save() {
        ExtractableResponse<Response> response = LAB_생성_요청(LAB_REQUEST);

        LAB_정상_생성됨(response);
    }

    @Test
    @DisplayName("Lab 정상 조회")
    void findById() {
        ExtractableResponse<Response> createResponse = LAB_생성_요청(LAB_REQUEST);
        Long id = extractCreatedId(createResponse);

        String managerToken = AuthAcceptanceTest.회원_등록_및_로그인_후_토큰_발급(
                MemberFixtures.managerCreationRequest(id, "managerTemp@email.com", "password"));
        ExtractableResponse<Response> response = LAB_조회_요청(managerToken, id);

        LAB_정상_조회됨(response, LAB_REQUEST.getName());
    }

    @Test
    @DisplayName("Lab 목록 조회 요청")
    void findAll() {
        ExtractableResponse<Response> createResponse = LAB_생성_요청(LAB_REQUEST);
        ExtractableResponse<Response> createResponse2 = LAB_생성_요청(LAB_REQUEST2);

        ExtractableResponse<Response> response = LAB_목록_조회_요청();

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        List<Long> expectedLabIds = Stream.of(createResponse, createResponse2)
                .map(LabAcceptanceTest::extractCreatedId)
                .collect(Collectors.toList());
        List<Long> resultLabIds = response.jsonPath()
                .getList("labResponses", LabResponse.class)
                .stream()
                .map(LabResponse::getId)
                .collect(Collectors.toList());
        assertThat(resultLabIds).containsAll(expectedLabIds);
    }

    @Test
    @DisplayName("Lab 수정 요청")
    void update() {
        ExtractableResponse<Response> createResponse = LAB_생성_요청(LAB_REQUEST);
        Long id = extractCreatedId(createResponse);

        String managerToken = AuthAcceptanceTest.회원_등록_및_로그인_후_토큰_발급(
                MemberFixtures.managerCreationRequest(id, "managerTemp@email.com", "password"));

        LabRequest updateLabRequest = new LabRequest("updateLabName");
        ExtractableResponse<Response> response = LAB_수정_요청(managerToken, id, updateLabRequest);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    @Test
    @DisplayName("Lab 삭제 요청")
    void delete() {
        ExtractableResponse<Response> createResponse = LAB_생성_요청(LAB_REQUEST);
        Long id = extractCreatedId(createResponse);

        String managerToken = AuthAcceptanceTest.회원_등록_및_로그인_후_토큰_발급(
                MemberFixtures.managerCreationRequest(id, "managerTemp@email.com", "password"));
        ExtractableResponse<Response> response = LAB_삭제_요청(managerToken, id);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }
}
