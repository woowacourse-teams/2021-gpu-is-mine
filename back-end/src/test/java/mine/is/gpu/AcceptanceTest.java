package mine.is.gpu;

import io.restassured.RestAssured;
import mine.is.gpu.gpuserver.domain.repository.GpuBoardRepository;
import mine.is.gpu.gpuserver.domain.repository.GpuServerRepository;
import mine.is.gpu.job.domain.repository.JobRepository;
import mine.is.gpu.lab.domain.repository.LabRepository;
import mine.is.gpu.member.domain.repository.MemberRepository;
import mine.is.gpu.worker.domain.repository.LogRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.annotation.DirtiesContext;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class AcceptanceTest {
    @Autowired
    private LabRepository labRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private GpuServerRepository gpuServerRepository;
    @Autowired
    private GpuBoardRepository gpuBoardRepository;
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private LogRepository logRepository;

    @LocalServerPort
    int port;
    @MockBean
    JavaMailSender javaMailSender;

    @BeforeEach
    public void setUp() {
        RestAssured.port = port;
    }

    @AfterEach
    void cleanUp() {
        logRepository.deleteAllInBatch();
        jobRepository.deleteAllInBatch();
        gpuBoardRepository.deleteAllInBatch();
        gpuServerRepository.deleteAllInBatch();
        memberRepository.deleteAllInBatch();
        labRepository.deleteAllInBatch();
    }
}
