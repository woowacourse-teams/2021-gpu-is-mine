package admin.gpuserver.application;

import admin.gpuserver.domain.*;
import admin.gpuserver.domain.repository.*;
import admin.gpuserver.dto.request.GpuBoardRequest;
import admin.gpuserver.dto.request.GpuServerRequest;
import admin.gpuserver.dto.request.GpuServerUpdateRequest;
import admin.gpuserver.dto.response.GpuServerResponse;
import admin.gpuserver.dto.response.GpuServerResponses;
import admin.gpuserver.exception.GpuServerServiceException;
import admin.lab.domain.Lab;
import admin.lab.domain.repository.LabRepository;
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
    private JobRepository jobRepository;

    public GpuServerService(LabRepository labRepository, GpuServerRepository gpuServerRepository,
                            GpuBoardRepository gpuBoardRepository, DeleteHistoryRepository deleteHistoryRepository,
                            JobRepository jobRepository) {
        this.labRepository = labRepository;
        this.gpuServerRepository = gpuServerRepository;
        this.gpuBoardRepository = gpuBoardRepository;
        this.deleteHistoryRepository = deleteHistoryRepository;
        this.jobRepository = jobRepository;
    }

    @Transactional(readOnly = true)
    public GpuServerResponse findById(Long gpuServerId) {
        GpuServer gpuServer = findGpuServerById(gpuServerId);
        GpuBoard gpuBoard = gpuBoardRepository.findByGpuServerId(gpuServerId)
                .orElseThrow(() -> new GpuServerServiceException("없는 보드입니다."));

        List<Job> jobsInBoard = jobRepository.findAllByGpuBoardId(gpuBoard.getId());
        return GpuServerResponse.of(gpuServer, gpuBoard, jobsInBoard);
    }

    @Transactional(readOnly = true)
    public GpuServerResponses findAll(Long labId) {
        checkLab(labId);

        List<GpuServer> gpuServers = gpuServerRepository.findByLabIdAndDeletedFalse(labId);
        List<GpuServerResponse> gpuServerResponses = gpuServers.stream()
                .map(server -> findById(server.getId()))
                .collect(Collectors.toList());
        return GpuServerResponses.of(gpuServerResponses);
    }

    @Transactional
    public void updateGpuServer(GpuServerUpdateRequest updateRequest, Long gpuServerId) {
        GpuServer gpuServer = findGpuServerById(gpuServerId);
        gpuServer.update(updateRequest.getName());
    }

    @Transactional
    public void delete(Long gpuServerId) {
        GpuServer gpuServer = findGpuServerById(gpuServerId);
        gpuServer.setDeleted(true);
        deleteHistoryRepository.save(new DeleteHistory(gpuServer));
    }

    @Transactional
    public Long saveGpuServer(GpuServerRequest gpuServerRequest, Long labId) {
        Lab lab = findLabById(labId);

        GpuServer gpuServer = new GpuServer(gpuServerRequest.getServerName(),
                gpuServerRequest.getMemorySize(), gpuServerRequest.getDiskSize(), lab);

        GpuBoardRequest gpuBoardRequest = gpuServerRequest.getGpuBoardRequest();
        GpuBoard gpuBoard = new GpuBoard(gpuBoardRequest.getPerformance(), gpuBoardRequest.getModelName(), gpuServer);

        gpuServerRepository.save(gpuServer);
        gpuBoardRepository.save(gpuBoard);

        return gpuServer.getId();
    }

    private void checkLab(Long labId) {
        if (!labRepository.existsById(labId)) {
            throw new GpuServerServiceException("Lab이 존재하지 않습니다.");
        }
    }

    private Lab findLabById(Long labId) {
        return labRepository.findById(labId)
                .orElseThrow(() -> new GpuServerServiceException("Lab이 존재하지 않습니다."));
    }

    private GpuServer findGpuServerById(Long gpuServerId) {
        return gpuServerRepository.findByIdAndDeletedFalse(gpuServerId)
            .orElseThrow(() -> new GpuServerServiceException("GPU 서버가 존재하지 않습니다."));
    }
}
