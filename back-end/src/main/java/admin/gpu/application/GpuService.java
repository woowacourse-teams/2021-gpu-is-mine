package admin.gpu.application;

import admin.gpu.domain.*;
import admin.gpu.dto.GpuRequest;
import admin.gpu.dto.GpuResponses;
import admin.gpu.dto.GpuServerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
public class GpuService {

    @Autowired
    private LabRepository labRepository;
    @Autowired
    private GpuServerRepository gpuServerRepository;
    @Autowired
    private GpuBoardRepository gpuBoardRepository;


    public int register(GpuRequest gpuRequest) {
        return 0;
    }

    //todo:
    public GpuServerResponse findGpuServer(Long labId, Long gpuId) {
        GpuServer gpuServer = gpuServerRepository.findById(labId).get();
        GpuBoard gpuBoard = gpuBoardRepository.findById(gpuId).get();
        return new GpuServerResponse(gpuServer, gpuBoard);
    }

    public GpuResponses gpuList(Long labId) {
        return new GpuResponses(Collections.emptyList());
    }

    public void modify(GpuRequest gpuRequest, Long labId, Long gpuId) {
    }

    public void delete(Long labId, Long gpuId) {
    }

    @Transactional
    public Long saveGpuServer(GpuRequest gpuRequest, Long labId) {
        Lab lab = labRepository.findById(labId).get();
        GpuServer gpuServer = new GpuServer(gpuRequest.getServerName(), gpuRequest.getMemorySize(), gpuRequest.getMemorySize(), lab);
        gpuServerRepository.save(gpuServer);
        return gpuServer.getId();
    }
}
