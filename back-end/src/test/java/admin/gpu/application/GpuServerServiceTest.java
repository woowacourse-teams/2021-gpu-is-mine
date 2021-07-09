package admin.gpu.application;

import static org.junit.jupiter.api.Assertions.assertThrows;

import admin.gpu.exception.GpuServiceException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class GpuServerServiceTest {

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
