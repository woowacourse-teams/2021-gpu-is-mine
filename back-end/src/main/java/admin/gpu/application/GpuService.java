package admin.gpu.application;

import admin.gpu.domain.DeleteHistory;
import admin.gpu.domain.GpuBoard;
import admin.gpu.domain.GpuServer;
import admin.gpu.domain.Lab;
import admin.gpu.domain.repository.DeleteHistoryRepository;
import admin.gpu.domain.repository.GpuBoardRepository;
import admin.gpu.domain.repository.GpuServerRepository;
import admin.gpu.domain.repository.LabRepository;
import admin.gpu.dto.GpuServerNameUpdateRequest;
import admin.gpu.dto.GpuServerRequest;
import admin.gpu.dto.GpuServerResponse;
import admin.gpu.dto.GpuServerResponses;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GpuService {
    private LabRepository labRepository;
    private GpuServerRepository gpuServerRepository;
    private GpuBoardRepository gpuBoardRepository;
    private DeleteHistoryRepository deleteHistoryRepository;

    public GpuService(LabRepository labRepository, GpuServerRepository gpuServerRepository,
                      GpuBoardRepository gpuBoardRepository, DeleteHistoryRepository deleteHistoryRepository) {
        this.labRepository = labRepository;
        this.gpuServerRepository = gpuServerRepository;
        this.gpuBoardRepository = gpuBoardRepository;
        this.deleteHistoryRepository = deleteHistoryRepository;
    }

    public GpuServerResponse findGpuServer(Long labId, Long gpuId) {
        GpuServer gpuServer = gpuServerRepository.findById(labId).get();
        GpuBoard gpuBoard = gpuBoardRepository.findById(gpuId).get();
        return new GpuServerResponse(gpuServer, gpuBoard);
    }

    public GpuServerResponses findAllGpuServer(Long labId) {
        return new GpuServerResponses(gpuServerRepository.findAll());
    }

    @Transactional
    public void updateGpuServer(GpuServerNameUpdateRequest gpuServerNameUpdateRequest, Long labId,
                                Long gpuServerId) {
        GpuServer gpuServer = gpuServerRepository.findById(gpuServerId).get();
        gpuServer.setName(gpuServerNameUpdateRequest.getName());
    }

    @Transactional
    public void delete(Long labId, Long gpuId) {
        GpuServer gpuServer = gpuServerRepository.findById(gpuId).get();
        gpuServer.setDeleted(true);
        deleteHistoryRepository.save(new DeleteHistory(gpuServer));
    }

    @Transactional
    public Long saveGpuServer(GpuServerRequest gpuServerRequest, Long labId) {
        Lab lab = labRepository.findById(labId).get();
        GpuServer gpuServer = new GpuServer(gpuServerRequest.getServerName(),
                gpuServerRequest.getMemorySize(),
                gpuServerRequest.getMemorySize(), lab);
        gpuServerRepository.save(gpuServer);
        return gpuServer.getId();
    }
}
