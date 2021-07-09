package admin.gpuserver.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import admin.gpuserver.domain.repository.GpuServerRepository;
import admin.gpuserver.dto.GpuBoardRequest;
import admin.gpuserver.dto.GpuServerNameUpdateRequest;
import admin.gpuserver.dto.GpuServerRequest;
import admin.gpuserver.dto.GpuServerResponse;
import admin.gpuserver.dto.GpuServerResponses;
import admin.gpuserver.exception.GpuServerServiceException;
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

    @DisplayName("특정 GPU서버를 조회한다.")
    @Test
    void 특정_GPU_서버를_조회() {
        GpuServerResponse gpuServer = gpuServerService.findGpuServer(1L, 1L);
        assertThat(gpuServer).isNotNull();
    }

    @DisplayName("존재하지 Lab_ID로 GPU 서버를 조회한다.")
    @Test
    void 존재하지_않는_Lab_ID로_GPU_서버를_조회() {
        assertThatThrownBy(() -> gpuServerService.findGpuServer(2L, 1L))
            .isInstanceOf(GpuServerServiceException.class)
            .hasMessage("Lab이 존재하지 않습니다.");
    }

    @DisplayName("존재하지 GPU_ID로 GPU 서버를 조회한다.")
    @Test
    void 존재하지_않는_GPU_ID로_GPU_서버를_조회() {
        assertThatThrownBy(() -> gpuServerService.findGpuServer(1L, 3L))
            .isInstanceOf(GpuServerServiceException.class)
            .hasMessage("GPU 서버가 존재하지 않습니다.");
    }

    @DisplayName("GPU 서버 전체를 조회 한다.")
    @Test
    void 전체_조회() {
        GpuServerResponses gpuServers = gpuServerService.findAllGpuServer(1L);
        assertThat(gpuServers.getGpuServerResponses()).hasSize(2);
    }

    @DisplayName("존재하지 Lab_ID로 GPU 서버 전체를 조회한다")
    @Test
    void 존재하지_않는_Lab_ID로_전체_조회() {
        assertThatThrownBy(() -> gpuServerService.findAllGpuServer(2L))
            .isInstanceOf(GpuServerServiceException.class)
            .hasMessage("Lab이 존재하지 않습니다.");
    }

    @DisplayName("GPU 서버의 이름을 수정한다.")
    @Test
    void 이름_수정() {
        // 이름 수정 전
        GpuServerResponse gpuServer = gpuServerService.findGpuServer(1L, 1L);
        assertThat(gpuServer.getServerName()).isEqualTo("GPU서버1");

        // 이름 수정 후
        GpuServerNameUpdateRequest gpuServerName = new GpuServerNameUpdateRequest("newGPU서버1");
        gpuServerService.updateGpuServer(gpuServerName, 1L, 1L);
        gpuServer = gpuServerService.findGpuServer(1L, 1L);
        assertThat(gpuServer.getServerName()).isEqualTo("newGPU서버1");
    }

    @DisplayName("존재하지 Lab_ID로 GPU 서버의 이름을 수정한다.")
    @Test
    void 존재하지_않는_Lab_ID로_GPU_서버의_이름을_수정() {
        GpuServerNameUpdateRequest gpuServerName = new GpuServerNameUpdateRequest("newGPU서버1");
        assertThatThrownBy(() -> gpuServerService.updateGpuServer(gpuServerName, 2L, 1L))
            .isInstanceOf(GpuServerServiceException.class)
            .hasMessage("Lab이 존재하지 않습니다.");
    }

    @DisplayName("존재하지 GPU_ID로 GPU 서버의 이름을 수정한다.")
    @Test
    void 존재하지_않는_GPU_ID로_GPU_서버의_이름을_수정() {
        GpuServerNameUpdateRequest gpuServerName = new GpuServerNameUpdateRequest("newGPU서버1");
        assertThatThrownBy(() -> gpuServerService.updateGpuServer(gpuServerName, 1L, 3L))
            .isInstanceOf(GpuServerServiceException.class)
            .hasMessage("GPU 서버가 존재하지 않습니다.");
    }

    @DisplayName("GPU 서버를 논리적으로 삭제하는 경우")
    @Test
    void deleteWithGpuId() {
        //when
        gpuServerService.delete(1L, 1L);
        //then
        assertTrue(gpuServerRepository.findById(1L).get().getDeleted());
    }

    @DisplayName("GPU 서버 삭제 과정에서 GPU ID를 찾을 수 없는 경우")
    @Test
    void deleteWithoutGpuId() {
        //then
        assertThrows(GpuServerServiceException.class, () -> {
            gpuServerService.delete(1L, 3L);
        });
    }

    @DisplayName("GPU 서버 삭제 과정에서 해당 GPU 가 이미 논리적으로 삭제되어 있는 경우")
    @Test
    void logicalDeletedGpuServerDelete() {
        //when
        gpuServerService.delete(1L, 1L);

        //then
        assertThrows(GpuServerServiceException.class, () -> {
            gpuServerService.delete(1L, 1L);
        });
    }

    @DisplayName("저장된 서버를 확인한다")
    @Test
    void saveServer() {
        //given
        Long gpuServerId = gpuServerService.saveGpuServer(
            new GpuServerRequest("testServer1", 1L, 1L,
                new GpuBoardRequest("nvdia", 10L)), 1L);
        //when
        //then
        assertThat(gpuServerRepository.findById(gpuServerId)).isNotEmpty();
    }

    @DisplayName("gpuServer 저장 과정에서 labId가 없는 경우")
    @Test
    void saveServerWithoutLabId() {
        //then
        assertThrows(GpuServerServiceException.class, () -> {
            gpuServerService.saveGpuServer(
                new GpuServerRequest("testServer1", 1L, 1L,
                    new GpuBoardRequest("nvdia", 10L)), 10L);
        });
    }
}
