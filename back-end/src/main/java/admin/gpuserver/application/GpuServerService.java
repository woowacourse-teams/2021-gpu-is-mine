package admin.gpuserver.application;

import admin.gpuserver.domain.*;
import admin.gpuserver.domain.repository.*;
import admin.gpuserver.dto.request.GpuBoardRequest;
import admin.gpuserver.dto.request.GpuServerNameUpdateRequest;
import admin.gpuserver.dto.request.GpuServerRequest;
import admin.gpuserver.dto.response.GpuServerResponse;
import admin.gpuserver.dto.response.GpuServerResponses;
import admin.gpuserver.exception.GpuServerServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GpuServerService {

    private LabRepository labRepository;
    private GpuServerRepository gpuServerRepository;
    private GpuBoardRepository gpuBoardRepository;
    private DeleteHistoryRepository deleteHistoryRepository;

    @Autowired
    private JobRepository jobRepository;

    public GpuServerService(LabRepository labRepository, GpuServerRepository gpuServerRepository,
                            GpuBoardRepository gpuBoardRepository, DeleteHistoryRepository deleteHistoryRepository) {
        this.labRepository = labRepository;
        this.gpuServerRepository = gpuServerRepository;
        this.gpuBoardRepository = gpuBoardRepository;
        this.deleteHistoryRepository = deleteHistoryRepository;
    }

    @Transactional(readOnly = true)
    public GpuServerResponse findById(Long gpuServerId) {
        GpuServer gpuServer = findValidGpuServer(gpuServerId);
        GpuBoard gpuBoard = gpuBoardRepository.findByGpuServerId(gpuServerId)
                .orElseThrow(() -> new GpuServerServiceException("없는 보드입니다."));

        List<Job> jobsInBoard = jobRepository.findAllByGpuBoardId(gpuBoard.getId());
        return new GpuServerResponse(gpuServer, gpuBoard, jobsInBoard);
    }

    @Transactional(readOnly = true)
    public GpuServerResponses findAll(Long labId) {
        validateLab(labId);

        List<GpuServer> gpuServers = gpuServerRepository.findByLabIdAndDeletedFalse(labId);
        List<GpuServerResponse> gpuServerResponses = gpuServers.stream()
                .map(server -> findById(server.getId()))
                .collect(Collectors.toList());
        return new GpuServerResponses(gpuServerResponses);
    }

    @Transactional
    public void updateGpuServer(GpuServerNameUpdateRequest gpuServerNameUpdateRequest, Long gpuServerId) {
        GpuServer gpuServer = findValidGpuServer(gpuServerId);
        gpuServer.setName(gpuServerNameUpdateRequest.getName());
    }

    @Transactional
    public void delete(Long gpuServerId) {
        GpuServer gpuServer = findValidGpuServer(gpuServerId);
        if (gpuServer.getDeleted()) {
            throw new GpuServerServiceException("Gpu 가 이미 삭제된 상태입니다");
        }
        gpuServer.setDeleted(true);
        deleteHistoryRepository.save(new DeleteHistory(gpuServer));
    }

    @Transactional
    public Long saveGpuServer(GpuServerRequest gpuServerRequest, Long labId) {
        Lab lab = findValidLab(labId);

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

    private Lab findValidLab(Long labId) {
        return labRepository.findById(labId)
                .orElseThrow(() -> new GpuServerServiceException("Lab이 존재하지 않습니다."));
    }

    private GpuServer findValidGpuServer(Long gpuServerId) {
        return gpuServerRepository.findByIdAndDeletedFalse(gpuServerId)
                .orElseThrow(() -> new GpuServerServiceException("GPU 서버가 존재하지 않습니다."));
    }
}
