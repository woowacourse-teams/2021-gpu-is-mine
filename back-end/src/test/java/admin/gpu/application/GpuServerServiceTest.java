package admin.gpu.application;

import admin.gpu.dto.GpuServerNameUpdateRequest;
import admin.gpu.dto.GpuServerResponse;
import admin.gpu.dto.GpuServerResponses;
import admin.gpu.exception.GpuServiceException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
public class GpuServerServiceTest {
    @Autowired
    private GpuServerService gpuServerService;

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
                .isInstanceOf(GpuServiceException.class)
                .hasMessage("Lab이 존재하지 않습니다.");
    }

    @DisplayName("존재하지 GPU_ID로 GPU 서버를 조회한다.")
    @Test
    void 존재하지_않는_GPU_ID로_GPU_서버를_조회() {
        assertThatThrownBy(() -> gpuServerService.findGpuServer(1L, 3L))
                .isInstanceOf(GpuServiceException.class)
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
                .isInstanceOf(GpuServiceException.class)
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
                .isInstanceOf(GpuServiceException.class)
                .hasMessage("Lab이 존재하지 않습니다.");
    }

    @DisplayName("존재하지 GPU_ID로 GPU 서버의 이름을 수정한다.")
    @Test
    void 존재하지_않는_GPU_ID로_GPU_서버의_이름을_수정() {
        GpuServerNameUpdateRequest gpuServerName = new GpuServerNameUpdateRequest("newGPU서버1");
        assertThatThrownBy(() -> gpuServerService.updateGpuServer(gpuServerName, 1L, 3L))
                .isInstanceOf(GpuServiceException.class)
                .hasMessage("GPU 서버가 존재하지 않습니다.");
    }

    @Autowired
    private GpuService gpuService;

    @DisplayName("GPU 서버를 논리적으로 삭제하는 경우")
    @Test
    void deleteWithGpuId() {
        //when
        gpuService.delete(1L, 1L);
        //then
//        assertThat(gpuService.isDeleted(1L, 1L)).isTrue();
    }

    @DisplayName("GPU 서버 삭제 과정에서 GPU ID를 찾을 수 없는 경우")
    @Test
    void deleteWithoutGpuId() {
        //then
        assertThrows(GpuServiceException.class, () -> {
            gpuService.delete(1L, 3L);
        });
    }

    @DisplayName("GPU 서버 삭제 과정에서 해당 GPU 가 이미 논리적으로 삭제되어 있는 경우")
    @Test
    void logicalDeletedGpuServerDelete() {
        //when
        gpuService.delete(1L, 1L);

        //then
        assertThrows(GpuServiceException.class, () -> {
            gpuService.delete(1L, 1L);
        });
    }
}
