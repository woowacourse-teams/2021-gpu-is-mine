package admin.gpu.domain;

import admin.gpu.application.GpuService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class DeleteHistoryRepositoryTest {
    @Autowired
    private DeleteHistoryRepository deleteHistoryRepository;
    @Autowired
    private GpuServerRepository gpuServerRepository;
    @Test
    void delete() {
        GpuServer gpuServer = gpuServerRepository.findById(1L).get();
    }
}