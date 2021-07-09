package admin.gpuserver.domain.repository;

import admin.gpuserver.domain.GpuServer;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

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