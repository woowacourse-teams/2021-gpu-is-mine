//package admin.gpuserver.ui;
//
//import admin.AcceptanceTest;
//import admin.gpuserver.application.GpuServerService;
//import admin.gpuserver.domain.*;
//import admin.gpuserver.domain.repository.GpuBoardRepository;
//import admin.gpuserver.domain.repository.GpuServerRepository;
//import admin.gpuserver.domain.repository.JobRepository;
//import admin.gpuserver.domain.repository.LabRepository;
//import admin.gpuserver.dto.request.GpuBoardRequest;
//import admin.gpuserver.dto.request.GpuServerNameUpdateRequest;
//import admin.gpuserver.dto.request.GpuServerRequest;
//import admin.gpuserver.dto.response.GpuBoardResponse;
//import admin.gpuserver.dto.response.GpuServerResponse;
//import com.sun.tools.javac.util.List;
//import io.restassured.RestAssured;
//import io.restassured.response.ExtractableResponse;
//import io.restassured.response.Response;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.web.server.LocalServerPort;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.persistence.EntityManager;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@Transactional
//@DisplayName("GpuServer 관련 API 테스트 - labId: 1")
//public class GpuServerAcceptanceTest extends AcceptanceTest {
//
//    @LocalServerPort
//    int port;
//
//    @Autowired
//    private GpuServerService gpuServerService;
//
//    @Autowired
//    private GpuServerRepository gpuServerRepository;
//
//    @Autowired
//    private GpuBoardRepository gpuBoardRepository;
//
//    @Autowired
//    private LabRepository labRepository;
//
//    @Autowired
//    private JobRepository jobRepository;
//
//    private Lab lab;
//
//    private GpuServer gpuServer1;
//    private GpuServer gpuServer2;
//
//    private GpuBoard gpuBoard1;
//    private GpuBoard gpuBoard2;
//
//    private Job job1;
//    private Job job2;
//    private Job job3;
//    private Job job4;
//
//    @BeforeEach
//    public void setUp() {
//        RestAssured.port = port;
//
//        lab = labRepository.save(new Lab("랩1"));
//
//        gpuServer1 = gpuServerRepository.save(new GpuServer("GPU서버1", false, 600L, 1024L, lab));
//        gpuServer2 = gpuServerRepository.save(new GpuServer("GPU서버2", true, 800L, 1024L, lab));
//
//        gpuBoard1 = gpuBoardRepository.save(new GpuBoard(true, 800L, "aaa", gpuServer1));
//        gpuServer1.setGpuBoard(gpuBoard1);
//
//        gpuBoard2 = gpuBoardRepository.save(new GpuBoard(true, 800L, "bbb", gpuServer2));
//        gpuServer2.setGpuBoard(gpuBoard2);
//
//        job1 = jobRepository.save(new Job("예약1", JobStatus.RUNNING));
//        job2 = jobRepository.save(new Job("예약2", JobStatus.WAITING));
//        job3 = jobRepository.save(new Job("예약3", JobStatus.WAITING));
//        job4 = jobRepository.save(new Job("예약4", JobStatus.WAITING));
//
//        gpuBoard1.setJobs(List.of(job1, job2, job3, job4));
//    }
//
//    @Autowired
//    EntityManager em;
//
//    @DisplayName("GpuServer 개별조회")
//    @Test
//    void fidndGpuServer() {
//        assertThat(lab).isNotNull();
//        System.out.println("aaaaaa"+lab.getId());
//        System.out.println("aaaaaa"+labRepository.existsById(lab.getId()));
//        em.clear();
//        System.out.println("aaaaaa"+labRepository.existsById(lab.getId()));
//    }
//
//
////    @DisplayName("GpuServer 개별조회")
////    @Test
////    void findGpuServer() {
////        assertThat(lab).isNotNull();
////        System.out.println("aaaaaa"+lab.getId());
////        System.out.println("aaaa"+labRepository.existsById(lab.getId()));
////
////        ExtractableResponse<Response> response = GpuServer_아이디조회(gpuServer1.getId());
////
////        System.out.println("aaaaaa"+labRepository.existsById(lab.getId()));
////
////        int expectedNumberOfJobs = gpuServer1.getGpuBoard().getJobs().size();
////
////        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
////        assertThat(response.jsonPath().getList("jobs")).hasSize(expectedNumberOfJobs);
////        assertThat(response.jsonPath().getObject("gpuBoard", GpuBoardResponse.class)).isNotNull();
////    }
//
//    @DisplayName("GpuServer 전체조회")
//    @Test
//    void findGpuServers() {
//        ExtractableResponse<Response> response = GpuServer_전체조회();
//
//        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
//        assertThat(response.jsonPath().getList("gpus", GpuServerResponse.class)).hasSize(2);
//    }
//
//    @DisplayName("GpuServer 생성")
//    @Test
//    void saveGpuServer() {
//        // given
//        GpuBoardRequest gpuBoardRequest = new GpuBoardRequest("추가보드1", 800L);
//        GpuServerRequest gpuServerRequest = new GpuServerRequest("추가서버1", 1024L, 1024L, gpuBoardRequest);
//
//        // when
//        ExtractableResponse<Response> response = GpuServer_생성(gpuServerRequest);
//
//        // then
//        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
//        assertThat(response.header("Location")).isNotNull();
//    }
//
//    @DisplayName("GpuServer 이름수정")
//    @Test
//    void modifyGpuServer() {
//        // given
//        // when
//        ExtractableResponse<Response> response = GpuServer_이름변경(new GpuServerNameUpdateRequest("서버이름변경"), gpuServer1.getId());
//
//        // then
//        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
//    }
//
//    @DisplayName("GpuServer 삭제")
//    @Test
//    void deleteGpuServer() {
//        // given
//        int beforeDeletedCount = GpuServer_전체조회갯수();
//
//        // when
//        ExtractableResponse<Response> response = GpuServer_삭제(gpuServer1.getId());
//
//        // then
//        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
//
//        int afterDeletedCount = GpuServer_전체조회갯수();
//        assertThat(afterDeletedCount).isEqualTo(beforeDeletedCount-1);
//    }
//
//    public ExtractableResponse<Response> GpuServer_아이디조회(Long gpuServerId) {
//        return RestAssured
//                .given().log().all()
//                .when().get("/api/labs/" + lab.getId() + "/gpus/" + gpuServerId)
//                .then().log().all()
//                .extract();
//    }
//
//    public ExtractableResponse<Response> GpuServer_전체조회() {
//        return RestAssured
//                .given().log().all()
//                .when().get("/api/labs/" + lab.getId() + "/gpus")
//                .then().log().all()
//                .extract();
//    }
//
//    public int GpuServer_전체조회갯수() {
//        ExtractableResponse<Response> response = RestAssured
//                .given().log().all()
//                .when().get("/api/labs/" + lab.getId() + "/gpus")
//                .then().log().all()
//                .extract();
//        return response.jsonPath().getList("gpus", GpuServerResponse.class).size();
//    }
//
//    public ExtractableResponse<Response> GpuServer_생성(GpuServerRequest gpuServerRequest) {
//        return RestAssured
//                .given().log().all()
//                .body(gpuServerRequest)
//                .contentType(MediaType.APPLICATION_JSON_VALUE)
//                .when().post("/api/labs/" + lab.getId() + "/gpus")
//                .then().log().all()
//                .extract();
//    }
//
//    public ExtractableResponse<Response> GpuServer_이름변경(GpuServerNameUpdateRequest gpuServerNameUpdateRequest, Long gpuServerId) {
//        return RestAssured
//                .given().log().all()
//                .body(gpuServerNameUpdateRequest)
//                .contentType(MediaType.APPLICATION_JSON_VALUE)
//                .when().put("/api/labs/" + lab.getId() + "/gpus/" + gpuServerId)
//                .then().log().all()
//                .extract();
//    }
//
//    public ExtractableResponse<Response> GpuServer_삭제(Long gpuServerId) {
//        return RestAssured
//                .given().log().all()
//                .when().delete("/api/labs/" + lab.getId() + "/gpus/" + gpuServerId)
//                .then().log().all()
//                .extract();
//    }
//
//    public String GpuServer_생성후아이디찾기(GpuServerRequest gpuServerRequest) {
//        ExtractableResponse<Response> response = RestAssured
//                .given().log().all()
//                .body(gpuServerRequest)
//                .contentType(MediaType.APPLICATION_JSON_VALUE)
//                .when().post("/api/" + lab.getId() + "/gpus")
//                .then().log().all()
//                .extract();
//
//        String[] locationPaths = response.header("Location").split("/");
//        return locationPaths[locationPaths.length - 1];
//    }
//}
