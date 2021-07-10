package admin.gpuserver.application;

import admin.gpuserver.domain.DeleteHistory;
import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import admin.gpuserver.domain.Lab;
import admin.gpuserver.domain.repository.DeleteHistoryRepository;
import admin.gpuserver.domain.repository.GpuBoardRepository;
import admin.gpuserver.domain.repository.GpuServerRepository;
import admin.gpuserver.domain.repository.LabRepository;
import admin.gpuserver.dto.request.GpuServerNameUpdateRequest;
import admin.gpuserver.dto.request.GpuServerRequest;
import admin.gpuserver.dto.response.GpuServerResponse;
import admin.gpuserver.dto.response.GpuServerResponses;
import admin.gpuserver.exception.GpuServerServiceException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class GpuServerService {

    private LabRepository labRepository;
    private GpuServerRepository gpuServerRepository;
    private GpuBoardRepository gpuBoardRepository;
    private DeleteHistoryRepository deleteHistoryRepository;

    public GpuServerService(LabRepository labRepository, GpuServerRepository gpuServerRepository,
        GpuBoardRepository gpuBoardRepository, DeleteHistoryRepository deleteHistoryRepository) {
        this.labRepository = labRepository;
        this.gpuServerRepository = gpuServerRepository;
        this.gpuBoardRepository = gpuBoardRepository;
        this.deleteHistoryRepository = deleteHistoryRepository;
    }

    @Transactional(readOnly = true)
    public GpuServerResponse findById(Long labId, Long gpuServerId) {
        labValidation(labId);
        GpuServer gpuServer = findValidationGpuServer(gpuServerId);
        GpuBoard gpuBoard = gpuServer.getGpuBoard();
        return new GpuServerResponse(gpuServer, gpuBoard);
    }

    @Transactional(readOnly = true)
    public GpuServerResponses findAll(Long labId) {
        labValidation(labId);
        List<GpuServer> gpuServers = gpuServerRepository.findAll();
        return new GpuServerResponses(gpuServers);
    }

    @Transactional
    public void updateGpuServer(GpuServerNameUpdateRequest gpuServerNameUpdateRequest,
        Long labId, Long gpuServerId) {
        labValidation(labId);
        GpuServer gpuServer = findValidationGpuServer(gpuServerId);
        gpuServer.setName(gpuServerNameUpdateRequest.getName());
    }

    @Transactional
    public void delete(Long labId, Long gpuServerId) {
        labValidation(labId);
        GpuServer gpuServer = findValidationGpuServer(gpuServerId);
        if (gpuServer.getDeleted()) {
            throw new GpuServerServiceException("Gpu 가 이미 삭제된 상태입니다");
        }
        gpuServer.setDeleted(true);
        deleteHistoryRepository.save(new DeleteHistory(gpuServer));
    }

    @Transactional
    public Long saveGpuServer(GpuServerRequest gpuServerRequest, Long labId) {
        labValidation(labId);
        Lab lab = labRepository.findById(labId).get();
        GpuServer gpuServer = new GpuServer(gpuServerRequest.getServerName(),
            gpuServerRequest.getMemorySize(),
            gpuServerRequest.getMemorySize(), lab);
        gpuServerRepository.save(gpuServer);
        return gpuServer.getId();
    }

    private void labValidation(Long labId) {
        labRepository.findById(labId)
            .orElseThrow(() -> new GpuServerServiceException("Lab이 존재하지 않습니다."));
    }

    private GpuServer findValidationGpuServer(Long gpuServerId) {
        return gpuServerRepository.findById(gpuServerId)
            .orElseThrow(() -> new GpuServerServiceException("GPU 서버가 존재하지 않습니다."));
    }
}
