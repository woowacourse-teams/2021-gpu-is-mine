package mine.is.gpu.gpuserver.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.List;
import mine.is.gpu.exception.http.NotFoundException;
import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.gpuserver.domain.repository.GpuBoardRepository;
import mine.is.gpu.gpuserver.domain.repository.GpuServerRepository;
import mine.is.gpu.gpuserver.dto.request.GpuBoardRequest;
import mine.is.gpu.gpuserver.dto.request.GpuServerRequest;
import mine.is.gpu.gpuserver.dto.response.GpuBoardResponse;
import mine.is.gpu.gpuserver.dto.response.GpuServerResponse;
import mine.is.gpu.gpuserver.dto.response.GpuServerStatusResponse;
import mine.is.gpu.gpuserver.dto.response.GpuServerMainPageResponses;
import mine.is.gpu.gpuserver.exception.GpuServerException;
import mine.is.gpu.job.domain.Job;
import mine.is.gpu.job.domain.repository.JobRepository;
import mine.is.gpu.lab.domain.Lab;
import mine.is.gpu.lab.domain.repository.LabRepository;
import mine.is.gpu.lab.exception.LabException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@ActiveProfiles("test")
@SpringBootTest
@Transactional
class GpuServerServiceTest {
    @Autowired
    private GpuServerService gpuServerService;
    @Autowired
    private GpuServerRepository gpuServerRepository;
    @Autowired
    private GpuBoardRepository gpuBoardRepository;
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private LabRepository labRepository;

    private Lab lab;
    private GpuServer gpuServer1;
    private GpuServer gpuServer2;
    private GpuBoard gpuBoard1;
    private GpuBoard gpuBoard2;

    @BeforeEach
    void setUp() {
        lab = labRepository.save(new Lab("랩1"));

        gpuServer1 = gpuServerRepository.save(new GpuServer("GPU서버1", false, 600L, 1024L, lab));
        gpuServer2 = gpuServerRepository.save(new GpuServer("GPU서버2", true, 800L, 1024L, lab));

        gpuBoard1 = gpuBoardRepository.save(new GpuBoard(true, 800L, "aaa", gpuServer1));
        gpuBoard2 = gpuBoardRepository.save(new GpuBoard(true, 800L, "bbb", gpuServer2));
    }

    @DisplayName("특정 GPU서버를 조회한다.")
    @Test
    void 특정_GPU_서버를_조회() {
        GpuServerResponse gpuServerResponse = gpuServerService.findById(gpuServer1.getId());

        assertThat(gpuServerResponse).isNotNull();
        assertThat(gpuServerResponse.getGpuBoard()).isNotNull();
        assertThat(gpuServerResponse.getGpuBoard().getId()).isNotNull();
    }

    @DisplayName("존재하지 않는 GPU_ID로 GPU 서버를 조회한다.")
    @Test
    void 존재하지_않는_GPU_ID로_GPU_서버를_조회() {
        final Long nonexistentServerId = Long.MAX_VALUE;

        assertThatThrownBy(() -> gpuServerService.findById(nonexistentServerId))
                .isEqualTo(GpuServerException.GPU_SERVER_NOT_FOUND.getException());
    }

    @DisplayName("삭제된 GPU_Server_ID로 GPU 서버를 조회한다.")
    @Test
    void 삭제된_GPU_Server_ID로_GPU_서버를_조회() {
        gpuServerService.deleteById(gpuServer1.getId());
        assertThatThrownBy(() -> gpuServerService.findById(gpuServer1.getId()))
                .isEqualTo(GpuServerException.GPU_SERVER_NOT_FOUND.getException());
    }

    @DisplayName("삭제된 GPU 서버를 제외한 전체를 조회 한다.")
    @Test
    void 삭제된_GPU_서버를_제외한_전체_조회() {
        GpuServerMainPageResponses before = gpuServerService.findAllInLab(lab.getId(), null);
        int beforeSize = before.getGpuServers().size();

        gpuServerService.deleteById(gpuServer1.getId());

        GpuServerMainPageResponses after = gpuServerService.findAllInLab(lab.getId(), null);
        assertThat(after.getGpuServers()).hasSize(beforeSize - 1);
    }

    @DisplayName("존재하지 Lab_ID로 GPU 서버 전체를 조회한다")
    @Test
    void 존재하지_않는_Lab_ID로_전체_조회() {
        final Long nonexistentLabId = Long.MAX_VALUE;
        assertThatThrownBy(() -> gpuServerService.findAllInLab(nonexistentLabId, null))
                .isEqualTo(LabException.LAB_NOT_FOUND.getException());
    }

    @DisplayName("GPU 서버를 수정한다.")
    @Test
    void 서버_수정() {
        assertThat(gpuServer1.getName()).isNotEqualTo("newServerName");

        GpuServerRequest gpuServerUpdateRequest = gpuServerUpdateRequest();
        gpuServerService.updateById(gpuServer1.getId(), gpuServerUpdateRequest);

        GpuServerResponse gpuServer = gpuServerService.findById(gpuServer1.getId());
        GpuBoardResponse gpuBoard = gpuServer.getGpuBoard();
        assertThat(gpuServer.getServerName()).isEqualTo("newServerName");
        assertThat(gpuServer.getMemorySize()).isEqualTo(2000L);
        assertThat(gpuServer.getDiskSize()).isEqualTo(2000L);
        assertThat(gpuBoard.getModelName()).isEqualTo("newModelName");
        assertThat(gpuBoard.getPerformance()).isEqualTo(2000L);
    }

    @DisplayName("존재하지 않는 GPU_Server_ID로 GPU 서버를 수정한다.")
    @Test
    void 존재하지_않는_GPU_ID로_GPU_서버를_수정() {
        final Long nonexistentServerId = Long.MAX_VALUE;

        GpuServerRequest gpuServerUpdateRequest = gpuServerUpdateRequest();
        assertThatThrownBy(() -> gpuServerService.updateById(nonexistentServerId, gpuServerUpdateRequest))
                .isEqualTo(GpuServerException.GPU_SERVER_NOT_FOUND.getException());
    }

    @DisplayName("삭제된 GPU_Server_ID로 GPU 서버를 수정한다.")
    @Test
    void 삭제된_GPU_ID로_GPU_서버를_수정() {
        gpuServerService.deleteById(gpuServer1.getId());
        GpuServerRequest gpuServerUpdateRequest = gpuServerUpdateRequest();
        assertThatThrownBy(() -> gpuServerService.updateById(gpuServer1.getId(), gpuServerUpdateRequest))
                .isEqualTo(GpuServerException.GPU_SERVER_NOT_FOUND.getException());

    }

    private GpuServerRequest gpuServerUpdateRequest() {
        GpuBoardRequest gpuBoardUpdateRequest = new GpuBoardRequest("newModelName", 2000L);
        return new GpuServerRequest(
                "newServerName",
                2000L,
                2000L,
                gpuBoardUpdateRequest
        );
    }

    @DisplayName("GPU 서버를 삭제하는 경우 GPU 보드, Job 도 같이 삭제된다.")
    @Test
    void deleteWithGpuId() {
        Long serverId = gpuServer1.getId();
        Long boardId = gpuBoardRepository.findByGpuServerId(serverId).get().getId();

        gpuServerService.deleteById(gpuServer1.getId());

        assertThatThrownBy(() -> gpuServerService.findById(serverId))
                .isInstanceOf(NotFoundException.class);

        boolean existenceOfGpuBoard = gpuBoardRepository.findById(boardId).isPresent();
        assertThat(existenceOfGpuBoard).isFalse();

        List<Job> jobs = jobRepository.findAllByGpuBoardId(boardId);
        assertThat(jobs).isEmpty();
    }

    @DisplayName("GPU 서버 삭제 과정에서 GPU ID를 찾을 수 없는 경우")
    @Test
    void deleteWithoutGpuId() {
        final Long nonexistentServerId = Long.MAX_VALUE;

        assertThatThrownBy(() -> gpuServerService.deleteById(nonexistentServerId))
                .isEqualTo(GpuServerException.GPU_SERVER_NOT_FOUND.getException());
    }

    @DisplayName("GPU 서버 삭제 과정에서 해당 GPU 가 이미 논리적으로 삭제되어 있는 경우")
    @Test
    void logicalDeletedGpuServerDelete() {
        gpuServerService.deleteById(gpuServer1.getId());

        assertThatThrownBy(() -> gpuServerService.deleteById(gpuServer1.getId()))
                .isEqualTo(GpuServerException.GPU_SERVER_NOT_FOUND.getException());
    }

    @DisplayName("저장된 서버를 확인한다")
    @Test
    void saveServer() {
        GpuBoardRequest boardRequest = new GpuBoardRequest("nvdia", 10L);
        GpuServerRequest gpuServerRequest = new GpuServerRequest("server", 1L, 1L, boardRequest);

        Long gpuServerId = gpuServerService.saveServerInLab(lab.getId(), gpuServerRequest);
        assertThat(gpuServerRepository.findById(gpuServerId)).isNotEmpty();
    }

    @DisplayName("중복된 이름으로 서버 생성 - 같은 랩")
    @Test
    void saveServerDuplicateNameSameLab() {
        String name = "serverName";

        GpuBoardRequest boardRequest1 = new GpuBoardRequest("nvdia", 10L);
        GpuServerRequest gpuServerRequest1 = new GpuServerRequest(name, 1L, 1L, boardRequest1);
        gpuServerService.saveServerInLab(lab.getId(), gpuServerRequest1);

        GpuBoardRequest boardRequest2 = new GpuBoardRequest("nvdia2", 20L);
        GpuServerRequest gpuServerRequest2 = new GpuServerRequest(name, 2L, 2L, boardRequest2);
        assertThatThrownBy(() -> gpuServerService.saveServerInLab(lab.getId(), gpuServerRequest2))
                .isEqualTo(GpuServerException.DUPLICATE_NAME_EXCEPTION.getException());
    }

    @DisplayName("중복된 이름으로 서버 생성 - 다른 랩")
    @Test
    void saveServerDuplicateNameNotSameLab() {
        String name = "serverName";

        GpuBoardRequest boardRequest1 = new GpuBoardRequest("nvdia", 10L);
        GpuServerRequest gpuServerRequest1 = new GpuServerRequest(name, 1L, 1L, boardRequest1);
        gpuServerService.saveServerInLab(lab.getId(), gpuServerRequest1);

        GpuBoardRequest boardRequest2 = new GpuBoardRequest("nvdia2", 20L);
        GpuServerRequest gpuServerRequest2 = new GpuServerRequest(name, 2L, 2L, boardRequest2);
        Lab lab2 = labRepository.save(new Lab("lab2"));
        Long gpuServerId = gpuServerService.saveServerInLab(lab2.getId(), gpuServerRequest2);
        assertThat(gpuServerId).isNotNull();
    }

    @DisplayName("중복된 이름으로 서버 수정 - 같은 랩")
    @Test
    void updateServerDuplicateNameSameLab() {
        String name = "serverName1";

        GpuBoardRequest boardRequest1 = new GpuBoardRequest("nvdia", 10L);
        GpuServerRequest gpuServerRequest1 = new GpuServerRequest(name, 1L, 1L, boardRequest1);
        gpuServerService.saveServerInLab(lab.getId(), gpuServerRequest1);

        GpuBoardRequest boardRequest2 = new GpuBoardRequest("nvdia2", 20L);
        GpuServerRequest gpuServerRequest2 = new GpuServerRequest("serverName2", 2L, 2L, boardRequest2);
        Long gpuServerId = gpuServerService.saveServerInLab(lab.getId(), gpuServerRequest2);

        GpuServerRequest gpuServerRequest3 = new GpuServerRequest(name, 2L, 2L, boardRequest2);
        assertThatThrownBy(() -> gpuServerService.updateById(gpuServerId, gpuServerRequest3))
                .isEqualTo(GpuServerException.DUPLICATE_NAME_EXCEPTION.getException());
    }

    @DisplayName("중복된 이름으로 서버 수정 - 다른 랩")
    @Test
    void updateServerDuplicateNameNotSameLab() {
        String name = "serverName1";

        GpuBoardRequest boardRequest1 = new GpuBoardRequest("nvdia", 10L);
        GpuServerRequest gpuServerRequest1 = new GpuServerRequest(name, 1L, 1L, boardRequest1);
        gpuServerService.saveServerInLab(lab.getId(), gpuServerRequest1);

        GpuBoardRequest boardRequest2 = new GpuBoardRequest("nvdia2", 20L);
        GpuServerRequest gpuServerRequest2 = new GpuServerRequest("serverName2", 2L, 2L, boardRequest2);
        Lab lab2 = labRepository.save(new Lab("lab2"));
        Long gpuServerId = gpuServerService.saveServerInLab(lab2.getId(), gpuServerRequest2);

        GpuServerRequest gpuServerRequest3 = new GpuServerRequest(name, 2L, 2L, boardRequest2);
        gpuServerService.updateById(gpuServerId, gpuServerRequest3);
        GpuServerResponse gpuServer = gpuServerService.findById(gpuServerId);
        assertThat(gpuServer.getServerName()).isEqualTo(name);
    }

    @DisplayName("gpuServer 저장 과정에서 labId가 없는 경우")
    @Test
    void saveServerWithoutLabId() {
        GpuBoardRequest boardRequest = new GpuBoardRequest("nvdia", 10L);
        GpuServerRequest gpuServerRequest = new GpuServerRequest("server", 1L, 1L, boardRequest);
        Long nonexistentLabId = Long.MAX_VALUE;

        assertThatThrownBy(() -> gpuServerService.saveServerInLab(nonexistentLabId, gpuServerRequest))
                .isEqualTo(LabException.LAB_NOT_FOUND.getException());
    }

    @DisplayName("서버의 상태를 확인한다.")
    @Test
    void findServerStatus() {
        GpuBoardRequest boardRequest = new GpuBoardRequest("nvdia", 10L);
        GpuServerRequest gpuServerRequest = new GpuServerRequest("server", 1L, 1L, boardRequest);

        Long serverId = gpuServerService.saveServerInLab(lab.getId(), gpuServerRequest);
        GpuServerStatusResponse status = gpuServerService.findStatusById(serverId);

        assertThat(status.getOn()).isFalse();
        assertThat(status.getWorking()).isFalse();
    }
}
