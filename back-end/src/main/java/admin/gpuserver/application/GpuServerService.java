package admin.gpuserver.application;

import admin.gpuserver.domain.DeleteHistory;
import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import admin.lab.domain.Lab;
import admin.gpuserver.domain.repository.DeleteHistoryRepository;
import admin.gpuserver.domain.repository.GpuBoardRepository;
import admin.gpuserver.domain.repository.GpuServerRepository;
import admin.lab.domain.repository.LabRepository;
import admin.gpuserver.dto.request.GpuBoardRequest;
import admin.gpuserver.dto.request.GpuServerNameUpdateRequest;
import admin.gpuserver.dto.request.GpuServerRequest;
import admin.gpuserver.dto.response.GpuServerResponse;
import admin.gpuserver.dto.response.GpuServerResponses;
import admin.gpuserver.exception.GpuServerServiceException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        validateLab(labId);
        GpuServer gpuServer = findValidGpuServer(gpuServerId);
        GpuBoard gpuBoard = gpuServer.getGpuBoard();
        return new GpuServerResponse(gpuServer, gpuBoard);
    }

    @Transactional(readOnly = true)
    public GpuServerResponses findAll(Long labId) {
        validateLab(labId);
        List<GpuServer> gpuServers = gpuServerRepository.findAllByDeletedFalse();
        return new GpuServerResponses(gpuServers);
    }

    @Transactional
    public void updateGpuServer(GpuServerNameUpdateRequest gpuServerNameUpdateRequest,
        Long labId, Long gpuServerId) {
        validateLab(labId);
        GpuServer gpuServer = findValidGpuServer(gpuServerId);
        gpuServer.setName(gpuServerNameUpdateRequest.getName());
    }

    @Transactional
    public void delete(Long labId, Long gpuServerId) {
        validateLab(labId);
        GpuServer gpuServer = findValidGpuServer(gpuServerId);
        if (gpuServer.getDeleted()) {
            throw new GpuServerServiceException("Gpu 가 이미 삭제된 상태입니다");
        }
        gpuServer.setDeleted(true);
        deleteHistoryRepository.save(new DeleteHistory(gpuServer));
    }

    @Transactional
    public Long saveGpuServer(GpuServerRequest gpuServerRequest, Long labId) {
        validateLab(labId);
        Lab lab = labRepository.findById(labId).get();
        GpuServer gpuServer = new GpuServer(gpuServerRequest.getServerName(),
            gpuServerRequest.getMemorySize(),
            gpuServerRequest.getDiskSize(), lab);
        GpuBoardRequest gpuBoardRequest = gpuServerRequest.getGpuBoardRequest();
        GpuBoard gpuBoard = new GpuBoard(false, gpuBoardRequest.getPerformance(),
            gpuBoardRequest.getModelName(), gpuServer);
        gpuServerRepository.save(gpuServer);
        gpuBoardRepository.save(gpuBoard);

        return gpuServer.getId();
    }

    private void validateLab(Long labId) {
        if (!labRepository.existsById(labId)) {
            throw new GpuServerServiceException("Lab이 존재하지 않습니다.");
        }
    }

    private GpuServer findValidGpuServer(Long gpuServerId) {
        return gpuServerRepository.findByIdAndDeletedFalse(gpuServerId)
            .orElseThrow(() -> new GpuServerServiceException("GPU 서버가 존재하지 않습니다."));
    }
}
