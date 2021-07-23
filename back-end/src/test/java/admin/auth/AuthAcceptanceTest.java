package admin.auth;

import static admin.lab.ui.LabAcceptanceTest.LAB_생성_요청_후_생성_ID_리턴;
import static admin.member.ui.MemberAcceptanceTest.MEMBER_생성_요청;
import static admin.member.ui.MemberAcceptanceTest.MEMBER_정상_조회됨;

import admin.AcceptanceTest;
import admin.auth.dto.TokenRequest;
import admin.auth.dto.TokenResponse;
import admin.lab.dto.LabRequest;
import admin.member.dto.request.MemberRequest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

public class AuthAcceptanceTest extends AcceptanceTest {

    private static final String EMAIL = "email@email.com";
    private static final String PASSWORD = "password";
    private MemberRequest memberRequest;

    public static ExtractableResponse<Response> 회원_등록되어_있음(MemberRequest memberRequest) {
        return MEMBER_생성_요청(memberRequest);
    }

    public static TokenResponse 로그인되어_있음(String email, String password) {
        ExtractableResponse<Response> response = 로그인_요청(email, password);
        return response.as(TokenResponse.class);
    }

    public static ExtractableResponse<Response> 로그인_요청(String email, String password) {
        TokenRequest tokenRequest = new TokenRequest(email, password);

        return RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(tokenRequest)
                .when()
                .post("/api/login/token")
                .then()
                .statusCode(HttpStatus.OK.value())
                .extract();
    }

    public static ExtractableResponse<Response> 내_회원_정보_조회_요청(TokenResponse tokenResponse) {
        return RestAssured
                .given()
                .auth()
                .oauth2(tokenResponse.getAccessToken())
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
        TokenResponse tokenResponse = 로그인되어_있음(EMAIL, PASSWORD);

        // when
        ExtractableResponse<Response> response = 내_회원_정보_조회_요청(tokenResponse);

        // then
        MEMBER_정상_조회됨(response, memberRequest);
    }

    @Test
    @DisplayName("Bearer Auth 로그인 실패 :: invalid email address")
    void InvalidEmailAddress() {
        회원_등록되어_있음(memberRequest);

        TokenRequest tokenRequest = new TokenRequest("", PASSWORD);

        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(tokenRequest)
                .when()
                .post("/api/login/token")
                .then()
                .statusCode(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("Bearer Auth 로그인 실패 :: non exist email address")
    void myInfoWithNonExistEmailAddress() {
        회원_등록되어_있음(memberRequest);

        TokenRequest tokenRequest = new TokenRequest(EMAIL + "other", PASSWORD);

        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(tokenRequest)
                .when()
                .post("/api/login/token")
                .then()
                .statusCode(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("Bearer Auth 로그인 실패 :: invalid password")
    void myInfoWithInvalidPassword() {
        회원_등록되어_있음(memberRequest);

        TokenRequest tokenRequest = new TokenRequest(EMAIL, PASSWORD + "other");

        RestAssured
                .given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(tokenRequest)
                .when()
                .post("/api/login/token")
                .then()
                .statusCode(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("Bearer Auth 유효하지 않은 토큰")
    void myInfoWithWrongBearerAuth() {
        TokenResponse tokenResponse = new TokenResponse("invalid_token");

        RestAssured
                .given()
                .auth()
                .oauth2(tokenResponse.getAccessToken())
                .accept(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/members/me")
                .then()
                .statusCode(HttpStatus.UNAUTHORIZED.value());
    }
}
