package admin.worker.ui;

import static org.assertj.core.api.Assertions.assertThat;

import admin.AcceptanceTest;
import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import admin.gpuserver.domain.repository.GpuBoardRepository;
import admin.gpuserver.domain.repository.GpuServerRepository;
import admin.gpuserver.dto.response.GpuServerResponse;
import admin.job.domain.Job;
import admin.job.domain.JobStatus;
import admin.job.domain.repository.JobRepository;
import admin.job.dto.response.JobResponse;
import admin.lab.domain.Lab;
import admin.lab.domain.repository.LabRepository;
import admin.member.domain.Member;
import admin.member.domain.MemberType;
import admin.member.domain.repository.MemberRepository;
import admin.worker.dto.WorkerJobRequest;
import admin.worker.dto.WorkerRequest;
import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import java.time.LocalDateTime;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

@DisplayName("[WorkerAcceptanceTest]")
class WorkerAcceptanceTest extends AcceptanceTest {
    @Autowired
    private LabRepository labRepository;
    @Autowired
    private GpuServerRepository gpuServerRepository;
    @Autowired
    private GpuBoardRepository gpuBoardRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private JobRepository jobRepository;

    private Lab lab1;
    private GpuServer gpuServer1;
    private GpuBoard gpuBoard1;
    private Member member1;
    private Job job1;
    private Job job2;

    private static ExtractableResponse<Response> 진행할_job_요청(Long gpuServerId) {
        return RestAssured.given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/workers/gpus/" + gpuServerId + "/job")
                .then()
                .extract();
    }

    private static ExtractableResponse<Response> Job_상태변경(Long memberId, Long jobId,
            WorkerJobRequest workerJobRequest) {
        return RestAssured.given()
                .body(workerJobRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .put("/api/workers/jobs/" + jobId + "/status?memberId=" + memberId)
                .then()
                .extract();
    }

    private static ExtractableResponse<Response> GpuServer_상태변경(Long gpuServerId, WorkerRequest workerRequest) {
        return RestAssured.given()
                .body(workerRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .put("/api/workers/gpus/" + gpuServerId + "/status")
                .then()
                .extract();
    }

    private static ExtractableResponse<Response> Job_조회(Long memberId, Long jobId) {
        return RestAssured.given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/jobs/" + jobId + "?memberId=" + memberId)
                .then()
                .extract();
    }

    private static ExtractableResponse<Response> GpuServer_조회(Long labId, Long gpuServerId) {
        return RestAssured.given()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/labs/" + labId + "/gpus/" + gpuServerId)
                .then()
                .extract();
    }

    @Override
    @BeforeEach
    public void setUp() {
        super.setUp();
        lab1 = new Lab("lab1");
        labRepository.save(lab1);
        gpuServer1 = new GpuServer("server1", true, 1024L, 1024L, lab1);
        gpuServerRepository.save(gpuServer1);
        gpuBoard1 = new GpuBoard(true, 600L, "NVIDIA42", gpuServer1);
        gpuBoardRepository.save(gpuBoard1);
        member1 = new Member("email@email.com", "password", "name1", MemberType.MANAGER, lab1);
        memberRepository.save(member1);
        job1 = new Job("job1", JobStatus.RUNNING, gpuBoard1, member1);
        jobRepository.save(job1);
        job2 = new Job("job2", JobStatus.WAITING, gpuBoard1, member1);
        jobRepository.save(job2);
    }

    @DisplayName("큐에서 작업을 진행할 job 을 가져온다.")
    @Test
    void takeJob() {
        ExtractableResponse<Response> response = 진행할_job_요청(gpuServer1.getId());

        Job_정상_반횐됨(response);
    }

    @DisplayName("job 의 상태를 변경한다.")
    @Test
    void updateJobStatus() {
        ExtractableResponse<Response> jobResponse = Job_조회(member1.getId(), job1.getId());
        assertThat(jobResponse.body().as(JobResponse.class).getStatus()).isEqualTo(JobStatus.RUNNING);

        ExtractableResponse<Response> response = Job_상태변경(member1.getId(), job1.getId(),
                new WorkerJobRequest(JobStatus.COMPLETED));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        ExtractableResponse<Response> actualJobResponse = Job_조회(member1.getId(), job1.getId());
        assertThat(actualJobResponse.body().as(JobResponse.class).getStatus()).isEqualTo(JobStatus.COMPLETED);
    }

    @DisplayName("GpuServer 의 상태를 변경한다.")
    @Test
    void updateWorkerStatus() {
        ExtractableResponse<Response> gpuServerResponse = GpuServer_조회(lab1.getId(), gpuServer1.getId());
        assertThat(gpuServerResponse.body().as(GpuServerResponse.class).getIsOn()).isTrue();

        ExtractableResponse<Response> response =
                GpuServer_상태변경(gpuServer1.getId(), new WorkerRequest(false, LocalDateTime.now()));

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        ExtractableResponse<Response> actualGpuServerResponse = GpuServer_조회(lab1.getId(), gpuServer1.getId());
        assertThat(actualGpuServerResponse.body().as(GpuServerResponse.class).getIsOn()).isFalse();
    }

    private void Job_정상_반횐됨(ExtractableResponse<Response> response) {
        JobResponse jobResponse = response.body().as(JobResponse.class);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        assertThat(jobResponse).isNotNull();
        assertThat(jobResponse.getId()).isEqualTo(job2.getId());
    }
}
