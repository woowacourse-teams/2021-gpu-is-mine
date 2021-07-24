package admin.member.ui;

import static admin.lab.ui.LabAcceptanceTest.LAB_생성_요청_후_생성_ID_리턴;
import static org.assertj.core.api.Assertions.assertThat;

import admin.AcceptanceTest;
import admin.lab.dto.LabRequest;
import admin.member.domain.MemberType;
import admin.member.dto.request.ChangeLabRequest;
import admin.member.dto.request.MemberInfoRequest;
import admin.member.dto.request.MemberRequest;
import admin.member.dto.request.MemberTypeRequest;
import admin.member.dto.response.MemberResponse;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

class MemberAcceptanceTest extends AcceptanceTest {
    private MemberRequest memberRequest;

    public static ExtractableResponse<Response> MEMBER_생성_요청(MemberRequest memberRequest) {
        return RestAssured.given()
                .body(memberRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .post("/api/members/")
                .then()
                .extract();
    }

    public static ExtractableResponse<Response> MEMBER_조회_요청(Long id) {
        return RestAssured.given()
                .when()
                .get("/api/members/" + id)
                .then()
                .extract();
    }

    public static ExtractableResponse<Response> MEMBER_정보_수정_요청(Long id, MemberInfoRequest memberInfo) {
        return RestAssured.given()
                .body(memberInfo)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .put("/api/members/" + id)
                .then()
                .extract();
    }

    public static ExtractableResponse<Response> MEMBER_타입_수정_요청(Long id, MemberTypeRequest memberTypeRequest) {
        return RestAssured.given()
                .body(memberTypeRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .put("/api/members/" + id + "/memberType")
                .then()
                .extract();
    }

    public static ExtractableResponse<Response> MEMBER_LAB_수정_요청(Long id, ChangeLabRequest changeLabRequest) {
        return RestAssured.given()
                .body(changeLabRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .put("/api/members/" + id + "/lab")
                .then()
                .extract();
    }

    public static ExtractableResponse<Response> MEMBER_삭제_요청(Long id) {
        return RestAssured.given()
                .when()
                .delete("/api/members/" + id)
                .then()
                .extract();
    }

    public static void MEMBER_정상_조회됨(ExtractableResponse<Response> response, MemberRequest memberRequest) {
        MemberResponse memberResponse = response.body()
                .as(MemberResponse.class);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        assertThat(memberResponse.getEmail()).isEqualTo(memberRequest.getEmail());
        assertThat(memberResponse.getName()).isEqualTo(memberRequest.getName());
        MemberType memberType = MemberType.ignoreCaseValueOf(memberRequest.getMemberType());
        Assertions.assertThat(memberResponse.getMemberType()).isEqualTo(memberType);
        assertThat(memberResponse.getLabResponse().getId()).isEqualTo(memberRequest.getLabId());
    }

    private static Long extractCreatedId(ExtractableResponse<Response> createResponse) {
        String uri = createResponse.header("Location");
        return extractCreatedId(uri);
    }

    private static Long extractCreatedId(String uri) {
        String[] uriToken = uri.split("/");
        return Long.valueOf(uriToken[uriToken.length - 1]);
    }

    @Override
    @BeforeEach
    public void setUp() {
        super.setUp();
        Long labId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("Lab"));
        memberRequest = new MemberRequest("email@email.com", "password", "name", "MANAGER", labId);
    }

    @Test
    @DisplayName("Member 정상 생성")
    void createMember() {
        ExtractableResponse<Response> response = MEMBER_생성_요청(memberRequest);

        MEMBER_정상_생성됨(response);
    }

    @Test
    @DisplayName("Member 정상 조회")
    void findById() {
        ExtractableResponse<Response> createResponse = MEMBER_생성_요청(memberRequest);
        Long createdId = extractCreatedId(createResponse);

        ExtractableResponse<Response> response = MEMBER_조회_요청(createdId);

        MEMBER_정상_조회됨(response, memberRequest);
    }

    @Test
    @DisplayName("Member 정보 수정 요청")
    void updateMemberInfo() {
        ExtractableResponse<Response> createResponse = MEMBER_생성_요청(memberRequest);
        Long id = extractCreatedId(createResponse);
        MemberInfoRequest memberInfoRequest = new MemberInfoRequest("update@update.com", "newPassword", "newName");

        ExtractableResponse<Response> response = MEMBER_정보_수정_요청(id, memberInfoRequest);
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());

        MemberResponse searchResponse = MEMBER_조회_요청(id).body().as(MemberResponse.class);
        assertThat(searchResponse.getEmail()).isEqualTo(memberInfoRequest.getEmail());
        assertThat(searchResponse.getName()).isEqualTo(memberInfoRequest.getName());
    }

    @Test
    @DisplayName("Member 타입 수정 요청")
    void updateMemberType() {
        ExtractableResponse<Response> createResponse = MEMBER_생성_요청(memberRequest);
        Long id = extractCreatedId(createResponse);
        MemberTypeRequest memberTypeRequest = new MemberTypeRequest("USER");

        ExtractableResponse<Response> response = MEMBER_타입_수정_요청(id, memberTypeRequest);
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());

        MemberResponse searchResponse = MEMBER_조회_요청(id).body().as(MemberResponse.class);
        MemberType memberType = MemberType.ignoreCaseValueOf(memberTypeRequest.getMemberType());
        Assertions.assertThat(searchResponse.getMemberType()).isEqualTo(memberType);
    }

    @Test
    @DisplayName("Member lab 수정 요청")
    void updateMemberLab() {
        ExtractableResponse<Response> createResponse = MEMBER_생성_요청(memberRequest);
        Long id = extractCreatedId(createResponse);
        Long newLabId = LAB_생성_요청_후_생성_ID_리턴(new LabRequest("newLab"));
        ChangeLabRequest changeLabRequest = new ChangeLabRequest(newLabId);

        ExtractableResponse<Response> response = MEMBER_LAB_수정_요청(id, changeLabRequest);
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());

        MemberResponse searchResponse = MEMBER_조회_요청(id).body().as(MemberResponse.class);
        assertThat(searchResponse.getLabResponse().getId()).isEqualTo(newLabId);
    }

    @Test
    @DisplayName("Member 삭제 요청")
    void deleteMember() {
        ExtractableResponse<Response> createResponse = MEMBER_생성_요청(memberRequest);
        Long id = extractCreatedId(createResponse);

        ExtractableResponse<Response> response = MEMBER_삭제_요청(id);
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());

        ExtractableResponse<Response> searchResponse = MEMBER_조회_요청(id);
        assertThat(searchResponse.statusCode()).isEqualTo(HttpStatus.NOT_FOUND.value());
    }

    private void MEMBER_정상_생성됨(ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(response.header("Location")).isNotBlank();
    }
}
