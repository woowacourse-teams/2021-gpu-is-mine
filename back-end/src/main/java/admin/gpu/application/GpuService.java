package admin.gpu.application;

import admin.gpu.domain.GpuBoard;
import admin.gpu.domain.GpuBoardRepository;
import admin.gpu.domain.GpuServer;
import admin.gpu.domain.GpuServerRepository;
import admin.gpu.domain.Lab;
import admin.gpu.domain.LabRepository;
import admin.gpu.dto.GpuServerRequest;
import admin.gpu.dto.GpuServerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GpuService {

    @Autowired
    private LabRepository labRepository;
    @Autowired
    private GpuServerRepository gpuServerRepository;
    @Autowired
    private GpuBoardRepository gpuBoardRepository;


    public GpuServerResponse findGpuServer(Long labId, Long gpuId) {
        GpuServer gpuServer = gpuServerRepository.findById(labId).get();
        GpuBoard gpuBoard = gpuBoardRepository.findById(gpuId).get();
        return new GpuServerResponse(gpuServer, gpuBoard);
    }

    //todo:
    public GpuServerResponses findAllGpuServer(Long labId) {
        return new GpuServerResponses(gpuServerRepository.findAll());
    }

    @Transactional
    public void updateGpuServer(GpuServerNameUpdateRequest gpuServerNameUpdateRequest, Long labId,
        Long gpuServerId) {
        GpuServer gpuServer = gpuServerRepository.findById(gpuServerId).get();
        gpuServer.setName(gpuServerNameUpdateRequest.getName());
    }

    public void delete(Long labId, Long gpuId) {
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
