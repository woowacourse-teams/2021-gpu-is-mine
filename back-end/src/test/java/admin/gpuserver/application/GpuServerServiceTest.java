package admin.gpuserver.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertTrue;

import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import admin.gpuserver.domain.repository.GpuBoardRepository;
import admin.gpuserver.domain.repository.GpuServerRepository;
import admin.gpuserver.dto.request.GpuBoardRequest;
import admin.gpuserver.dto.request.GpuServerRequest;
import admin.gpuserver.dto.request.GpuServerUpdateRequest;
import admin.gpuserver.dto.response.GpuServerResponse;
import admin.gpuserver.dto.response.GpuServerResponses;
import admin.gpuserver.dto.response.GpuServerStatusResponse;
import admin.gpuserver.exception.GpuServerException;
import admin.job.domain.Job;
import admin.job.domain.JobStatus;
import admin.job.domain.repository.JobRepository;
import admin.lab.domain.Lab;
import admin.lab.domain.repository.LabRepository;
import admin.lab.exception.LabException;
import admin.member.domain.Member;
import admin.member.domain.MemberType;
import admin.member.domain.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class GpuServerServiceTest {

    @Autowired
    private GpuServerService gpuServerService;

    @Autowired
    private GpuServerRepository gpuServerRepository;

    @Autowired
    private GpuBoardRepository gpuBoardRepository;

    @Autowired
    private LabRepository labRepository;

    private Lab lab;

    private GpuServer gpuServer1;
    private GpuServer gpuServer2;

    private GpuBoard gpuBoard1;
    private GpuBoard gpuBoard2;

    @BeforeEach
    private void setUp() {
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
        gpuServerService.delete(gpuServer1.getId());
        assertThatThrownBy(() -> gpuServerService.findById(gpuServer1.getId()))
                .isEqualTo(GpuServerException.GPU_SERVER_NOT_FOUND.getException());
    }

    @DisplayName("삭제된 GPU 서버를 제외한 전체를 조회 한다.")
    @Test
    void 삭제된_GPU_서버를_제외한_전체_조회() {
        GpuServerResponses gpuServerResponses = gpuServerService.findAllUndeletedServer(lab.getId());
        int beforeSize = gpuServerResponses.getGpuServers().size();

        gpuServerService.delete(gpuServer1.getId());

        GpuServerResponses gpuServers = gpuServerService.findAllUndeletedServer(lab.getId());
        assertThat(gpuServers.getGpuServers()).hasSize(beforeSize - 1);
    }

    @DisplayName("존재하지 Lab_ID로 GPU 서버 전체를 조회한다")
    @Test
    void 존재하지_않는_Lab_ID로_전체_조회() {
        final Long nonexistentLabId = Long.MAX_VALUE;
        assertThatThrownBy(() -> gpuServerService.findAllUndeletedServer(nonexistentLabId))
                .isEqualTo(LabException.LAB_NOT_FOUND.getException());
    }

    @DisplayName("GPU 서버의 이름을 수정한다.")
    @Test
    void 이름_수정() {
        assertThat(gpuServer1.getName()).isNotEqualTo("newGPU서버1");

        GpuServerUpdateRequest gpuServerName = new GpuServerUpdateRequest("newGPU서버1");
        gpuServerService.updateGpuServer(gpuServerName, gpuServer1.getId());

        GpuServerResponse gpuServer = gpuServerService.findById(gpuServer1.getId());
        assertThat(gpuServer.getServerName()).isEqualTo("newGPU서버1");
    }

    @DisplayName("존재하지 않는 GPU_Server_ID로 GPU 서버의 이름을 수정한다.")
    @Test
    void 존재하지_않는_GPU_ID로_GPU_서버의_이름을_수정() {
        final Long nonexistentServerId = Long.MAX_VALUE;

        GpuServerUpdateRequest gpuServerName = new GpuServerUpdateRequest("newGPU서버1");
        assertThatThrownBy(() -> gpuServerService.updateGpuServer(gpuServerName, nonexistentServerId))
                .isEqualTo(GpuServerException.GPU_SERVER_NOT_FOUND.getException());
    }

    @DisplayName("삭제된 GPU_Server_ID로 GPU 서버의 이름을 수정한다.")
    @Test
    void 삭제된_GPU_ID로_GPU_서버의_이름을_수정() {
        gpuServerService.delete(gpuServer1.getId());
        GpuServerUpdateRequest gpuServerName = new GpuServerUpdateRequest("newGPU서버1");
        assertThatThrownBy(() -> gpuServerService.updateGpuServer(gpuServerName, gpuServer1.getId()))
                .isEqualTo(GpuServerException.GPU_SERVER_NOT_FOUND.getException());

    }

    @DisplayName("GPU 서버를 논리적으로 삭제하는 경우")
    @Test
    void deleteWithGpuId() {
        gpuServerService.delete(gpuServer1.getId());
        GpuServer deletedGpuServer = gpuServerRepository.findById(gpuServer1.getId())
                .orElseThrow(IllegalArgumentException::new);
        assertTrue(deletedGpuServer.getDeleted());
    }

    @DisplayName("GPU 서버 삭제 과정에서 GPU ID를 찾을 수 없는 경우")
    @Test
    void deleteWithoutGpuId() {
        final Long nonexistentServerId = Long.MAX_VALUE;

        assertThatThrownBy(() -> gpuServerService.delete(nonexistentServerId))
                .isEqualTo(GpuServerException.GPU_SERVER_NOT_FOUND.getException());
    }

    @DisplayName("GPU 서버 삭제 과정에서 해당 GPU 가 이미 논리적으로 삭제되어 있는 경우")
    @Test
    void logicalDeletedGpuServerDelete() {
        gpuServerService.delete(gpuServer1.getId());

        assertThatThrownBy(() -> gpuServerService.delete(gpuServer1.getId()))
                .isEqualTo(GpuServerException.GPU_SERVER_NOT_FOUND.getException());
    }

    @DisplayName("저장된 서버를 확인한다")
    @Test
    void saveServer() {
        GpuBoardRequest boardRequest = new GpuBoardRequest("nvdia", 10L);
        GpuServerRequest gpuServerRequest = new GpuServerRequest("server", 1L, 1L, boardRequest);

        Long gpuServerId = gpuServerService.saveGpuServer(gpuServerRequest, lab.getId());
        assertThat(gpuServerRepository.findById(gpuServerId)).isNotEmpty();
    }

    @DisplayName("gpuServer 저장 과정에서 labId가 없는 경우")
    @Test
    void saveServerWithoutLabId() {
        GpuBoardRequest boardRequest = new GpuBoardRequest("nvdia", 10L);
        GpuServerRequest gpuServerRequest = new GpuServerRequest("server", 1L, 1L, boardRequest);
        Long nonexistentLabId = Long.MAX_VALUE;

        assertThatThrownBy(() -> gpuServerService.saveGpuServer(gpuServerRequest, nonexistentLabId))
                .isEqualTo(LabException.LAB_NOT_FOUND.getException());
    }

    @DisplayName("서버의 상태를 확인한다.")
    @Test
    void findServerStatus() {
        GpuBoardRequest boardRequest = new GpuBoardRequest("nvdia", 10L);
        GpuServerRequest gpuServerRequest = new GpuServerRequest("server", 1L, 1L, boardRequest);

        Long serverId = gpuServerService.saveGpuServer(gpuServerRequest, lab.getId());
        GpuServerStatusResponse status = gpuServerService.findStatusById(serverId);

        assertThat(status.getOn()).isFalse();
        assertThat(status.getWorking()).isFalse();
    }
}
