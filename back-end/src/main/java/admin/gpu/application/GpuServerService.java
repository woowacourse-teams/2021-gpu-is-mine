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
import admin.gpu.exception.GpuServiceException;
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

    @Transactional(readOnly = true)
    public GpuServerResponse findGpuServer(Long labId, Long gpuServerId) {
        labValidation(labId);
        GpuServer gpuServer = gpuServerRepository.findById(gpuServerId)
                .orElseThrow(() -> new GpuServiceException("GPU 서버가 존재하지 않습니다."));
        GpuBoard gpuBoard = gpuServer.getGpuBoard();
        return new GpuServerResponse(gpuServer, gpuBoard);
    }

    private void labValidation(Long labId) {
        labRepository.findById(labId)
                .orElseThrow(() -> new GpuServiceException("Lab이 존재하지 않습니다."));
    }

    @Transactional(readOnly = true)
    public GpuServerResponses findAllGpuServer(Long labId) {
        labValidation(labId);
        return new GpuServerResponses(gpuServerRepository.findAll());
    }

    @Transactional
    public void updateGpuServer(GpuServerNameUpdateRequest gpuServerNameUpdateRequest,
                                Long labId, Long gpuServerId) {
        labValidation(labId);
        GpuServer gpuServer = gpuServerRepository.findById(gpuServerId)
                .orElseThrow(() -> new GpuServiceException("GPU 서버가 존재하지 않습니다."));
        gpuServer.setName(gpuServerNameUpdateRequest.getName());
    }

    @Transactional
    public void delete(Long labId, Long gpuId) {
        if (isNotExistGpuServer(gpuId)) {
            throw new GpuServiceException("Gpu Id가 존재하지 않습니다.");
        }
        GpuServer gpuServer = gpuServerRepository.findById(gpuId).get();

        if (gpuServer.getDeleted()) {
            throw new GpuServiceException("Gpu 가 이미 삭제된 상태입니다");
        }
        gpuServer.setDeleted(true);
        deleteHistoryRepository.save(new DeleteHistory(gpuServer));
    }

    private boolean isNotExistGpuServer(Long gpuId) {
        return !gpuServerRepository.existsById(gpuId);
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
