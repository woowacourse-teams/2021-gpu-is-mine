package admin.job.application;

import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import admin.gpuserver.domain.LabUser;
import admin.gpuserver.domain.UserType;
import admin.gpuserver.domain.repository.GpuBoardRepository;
import admin.gpuserver.domain.repository.GpuServerRepository;
import admin.gpuserver.domain.repository.LabUserRepository;
import admin.job.dto.request.JobRequest;
import admin.job.dto.response.JobResponse;
import admin.lab.domain.Lab;
import admin.lab.domain.repository.LabRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@Transactional
class JobServiceTest {
    @Autowired
    private JobService jobService;
    @Autowired
    private GpuBoardRepository gpuBoardRepository;
    @Autowired
    private LabUserRepository labUserRepository;
    @Autowired
    private LabRepository labRepository;
    @Autowired
    private GpuServerRepository gpuServerRepository;
    private GpuServer server;
    private GpuBoard board;
    private Lab lab;
    private LabUser labUser;

    @BeforeEach
    void setUp() {
        lab = new Lab("lab");
        labRepository.save(lab);
        server = new GpuServer("server", true, 1024L, 1024L, lab);
        gpuServerRepository.save(server);
        board = new GpuBoard(false, 600L, "nvdia", server);
        gpuBoardRepository.save(board);
        labUser = new LabUser("name", UserType.MANAGER, lab);
        labUserRepository.save(labUser);
    }

    @Test
    @DisplayName("정상 등록")
    void insert() {
        JobRequest jobRequest = new JobRequest(server.getId(), "job", "metadata", "12");
        Long id = jobService.insert(labUser.getId(), jobRequest);
        assertThat(id).isNotNull();
    }

    @Test
    @DisplayName("존재하지 않는 멤버 job등록시 에러 발생")
    void insertNotExistingMember() {
        Long notExistingMemberId = Long.MAX_VALUE;
        JobRequest jobRequest = new JobRequest(server.getId(), "job", "metadata", "12");

        assertThatThrownBy(() -> jobService.insert(notExistingMemberId, jobRequest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("user 가 없습니다.");
    }

    @Test
    @DisplayName("존재하지 않는 서버 job등록시 에러 발생")
    void insertNotExistingServer() {
        Long notExistingServerId = Long.MAX_VALUE;
        JobRequest jobRequest = new JobRequest(notExistingServerId, "job", "metadata", "12");

        assertThatThrownBy(() -> jobService.insert(labUser.getId(), jobRequest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("board 가 없습니다.");
    }

    @Test
    @DisplayName("정상 조회")
    void findById() {
        JobRequest jobRequest = new JobRequest(server.getId(), "job", "metadata", "12");
        Long jobId = jobService.insert(labUser.getId(), jobRequest);

        JobResponse jobResponse = jobService.findById(jobId);
        assertThat(jobResponse).isNotNull();
    }

    @Test
    @DisplayName("존재하지 않는 Job Id로 조회")
    void findByNotExistingId() {
        Long notExistingJobId = Long.MAX_VALUE;

        assertThatThrownBy(() -> jobService.findById(notExistingJobId))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("job 이 없습니다.");
    }
}
