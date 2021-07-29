package admin.auth;

import static admin.lab.ui.LabAcceptanceTest.LAB_생성_요청_후_생성_ID_리턴;
import static admin.member.ui.MemberAcceptanceTest.MEMBER_생성_요청;
import static admin.member.ui.MemberAcceptanceTest.MEMBER_정상_조회됨;

import admin.AcceptanceTest;
import admin.auth.dto.LoginRequest;
import admin.auth.dto.LoginResponse;
import admin.lab.dto.LabRequest;
import admin.member.dto.request.MemberRequest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

public class AuthAcceptanceTest extends AcceptanceTest {

    private static final String EMAIL = "email@email.com";
    private static final String PASSWORD = "password";
    private MemberRequest memberRequest;

    public static String 회원_등록_및_로그인_후_토큰_발급(MemberRequest memberRequest) {
        회원_등록되어_있음(memberRequest);
        return 로그인되어_있음(memberRequest.getEmail(), memberRequest.getPassword()).getAccessToken();
    }

    public static ExtractableResponse<Response> 회원_등록되어_있음(MemberRequest memberRequest) {
        return MEMBER_생성_요청(memberRequest);
    }

    public static LoginResponse 로그인되어_있음(String email, String password) {
        ExtractableResponse<Response> response = 로그인_요청(email, password);
        return response.as(LoginResponse.class);
    }

    public static ExtractableResponse<Response> 로그인_요청(String email, String password) {
        LoginRequest loginRequest = new LoginRequest(email, password);

        return RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(loginRequest)
                .when()
                .post("/api/login")
                .then()
                .statusCode(HttpStatus.OK.value())
                .extract();
    }

    public static ExtractableResponse<Response> 내_회원_정보_조회_요청(LoginResponse loginResponse) {
        return RestAssured
                .given()
                .auth()
                .oauth2(loginResponse.getAccessToken())
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/members/me")
                .then()
                .statusCode(HttpStatus.OK.value())
                .extract();
    }

    @Override
    @BeforeEach
    public void setUp() {
        super.setUp();
        Long labId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("Lab"));
        memberRequest = new MemberRequest(EMAIL, PASSWORD, "name", "MANAGER", labId);
    }

    @Test
    @DisplayName("Bearer Auth 로그인 성공")
    void myInfoWithBearerAuth() {
        // given
        회원_등록되어_있음(memberRequest);
        LoginResponse loginResponse = 로그인되어_있음(EMAIL, PASSWORD);

        // when
        ExtractableResponse<Response> response = 내_회원_정보_조회_요청(loginResponse);

        // then
        MEMBER_정상_조회됨(response, memberRequest);
    }

    @Test
    @DisplayName("Bearer Auth 로그인 실패 :: invalid email address")
    void InvalidEmailAddress() {
        회원_등록되어_있음(memberRequest);

        LoginRequest loginRequest = new LoginRequest("", PASSWORD);

        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(loginRequest)
                .when()
                .post("/api/login")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("Bearer Auth 로그인 실패 :: non exist email address")
    void myInfoWithNonExistEmailAddress() {
        회원_등록되어_있음(memberRequest);

        LoginRequest loginRequest = new LoginRequest(EMAIL + "other", PASSWORD);

        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(loginRequest)
                .when()
                .post("/api/login")
                .then()
                .statusCode(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("Bearer Auth 로그인 실패 :: invalid password")
    void myInfoWithInvalidPassword() {
        회원_등록되어_있음(memberRequest);

        LoginRequest loginRequest = new LoginRequest(EMAIL, PASSWORD + "other");

        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(loginRequest)
                .when()
                .post("/api/login")
                .then()
                .statusCode(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("Bearer Auth 유효하지 않은 토큰")
    void myInfoWithWrongBearerAuth() {
        LoginResponse loginResponse = new LoginResponse("invalid_token");

        RestAssured
                .given()
                .auth()
                .oauth2(loginResponse.getAccessToken())
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/members/me")
                .then()
                .statusCode(HttpStatus.UNAUTHORIZED.value());
    }

    // 해당 테스트를 진행하려면 AuthenticationPrincipalConfig 에서 LoginInterceptor의 주석을 해제 후 진행
    // 다른 테스트코드는 authorization 적용이 되지 않아서 전체를 돌리면 테스트가 깨짐
    @Disabled
    @DisplayName("GET /api/labs/{id} 에 권한이 있는 사용자가 접근한다.")
    @Test
    void accessLabMember() {
        회원_등록되어_있음(memberRequest);
        LoginResponse loginResponse = 로그인되어_있음(EMAIL, PASSWORD);

        RestAssured
                .given()
                .auth()
                .oauth2(loginResponse.getAccessToken())
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/labs/" + memberRequest.getLabId())
                .then()
                .statusCode(HttpStatus.OK.value());

    }

    // 해당 테스트를 진행하려면 AuthenticationPrincipalConfig 에서 LoginInterceptor의 주석을 해제 후 진행
    // 다른 테스트코드는 authorization 적용이 되지 않아서 전체를 돌리면 테스트가 깨짐
    @Disabled
    @DisplayName("GET /api/labs/{id} 에 권한이 없는 사용자가 접근한다.")
    @Test
    void accessNonLabMember() {
        회원_등록되어_있음(memberRequest);
        LoginResponse loginResponse = 로그인되어_있음(EMAIL, PASSWORD);

        RestAssured
                .given()
                .auth()
                .oauth2(loginResponse.getAccessToken())
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/labs/" + Long.MAX_VALUE)
                .then()
                .statusCode(HttpStatus.UNAUTHORIZED.value());

    }
}
