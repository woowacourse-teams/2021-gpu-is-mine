package admin.gpuserver.application;

import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import admin.gpuserver.domain.repository.GpuBoardRepository;
import admin.gpuserver.domain.repository.GpuServerRepository;
import admin.gpuserver.dto.request.GpuBoardRequest;
import admin.gpuserver.dto.request.GpuServerRequest;
import admin.gpuserver.dto.request.GpuServerUpdateRequest;
import admin.gpuserver.dto.response.GpuServerResponse;
import admin.gpuserver.dto.response.GpuServerResponses;
import admin.gpuserver.dto.response.GpuServerStatusResponse;
import admin.gpuserver.exception.GpuBoardException;
import admin.gpuserver.exception.GpuServerException;
import admin.job.domain.Job;
import admin.job.domain.repository.JobRepository;
import admin.lab.domain.Lab;
import admin.lab.domain.repository.LabRepository;
import admin.lab.exception.LabException;
import admin.member.domain.Member;
import admin.member.domain.repository.MemberRepository;
import admin.member.exception.MemberException;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GpuServerService {

    private LabRepository labRepository;
    private GpuServerRepository gpuServerRepository;
    private GpuBoardRepository gpuBoardRepository;
    private JobRepository jobRepository;

    public GpuServerService(LabRepository labRepository,
            GpuServerRepository gpuServerRepository,
            GpuBoardRepository gpuBoardRepository, JobRepository jobRepository) {
        this.labRepository = labRepository;
        this.gpuServerRepository = gpuServerRepository;
        this.gpuBoardRepository = gpuBoardRepository;
        this.jobRepository = jobRepository;
    }

    @Transactional(readOnly = true)
    public GpuServerResponse findServerInLab(Long labId, Long gpuServerId) {
        GpuServer gpuServer = findServerByIdAndLabId(labId, gpuServerId);
        GpuBoard gpuBoard = gpuBoardRepository.findByGpuServerId(gpuServerId)
                .orElseThrow(GpuBoardException.GPU_BOARD_NOT_FOUND::getException);

        List<Job> jobsInBoard = jobRepository.findAllByGpuBoardId(gpuBoard.getId());
        return GpuServerResponse.of(gpuServer, gpuBoard, jobsInBoard);
    }

    @Transactional(readOnly = true)
    public GpuServerResponses findAllInLab(Long labId) {
        validateLab(labId);

        List<GpuServer> gpuServers = gpuServerRepository.findAllByLabId(labId);
        List<GpuServerResponse> gpuServerResponses = gpuServers.stream()
                .map(server -> findServerInLab(labId, server.getId()))
                .collect(Collectors.toList());
        return GpuServerResponses.of(gpuServerResponses);
    }

    @Transactional(readOnly = true)
    public List<GpuServer> findAllByLabId(Long labId) {
        return gpuServerRepository.findAllByLabId(labId);
    }

    @Transactional
    public void updateServerInLab(Long labId, Long gpuServerId, GpuServerUpdateRequest updateRequest) {
        GpuServer gpuServer = findServerByIdAndLabId(labId, gpuServerId);
        gpuServer.update(updateRequest.getName());
    }

    @Transactional
    public void deleteServerInLab(Long labId, Long gpuServerId) {
        GpuServer gpuServer = findServerByIdAndLabId(labId, gpuServerId);
        GpuBoard gpuBoard = findGpuBoardByServerId(gpuServer.getId());
        List<Job> jobs = jobRepository.findAllByGpuBoardId(gpuBoard.getId());

        jobRepository.deleteInBatch(jobs);
        gpuBoardRepository.delete(gpuBoard);
        gpuServerRepository.delete(gpuServer);
    }

    @Transactional
    public Long saveServerInLab(Long labId, GpuServerRequest gpuServerRequest) {
        Lab lab = findLabById(labId);

        GpuServer gpuServer = gpuServerRequest.toEntity(lab);
        gpuServerRepository.save(gpuServer);

        GpuBoardRequest gpuBoardRequest = gpuServerRequest.getGpuBoardRequest();
        gpuBoardRepository.save(gpuBoardRequest.toEntity(gpuServer));

        return gpuServer.getId();
    }

    @Transactional(readOnly = true)
    public GpuServerStatusResponse findServerStatusInLab(Long labId, Long gpuServerId) {
        GpuServer gpuServer = findServerByIdAndLabId(labId, gpuServerId);
        GpuBoard gpuBoard = findGpuBoardByServerId(gpuServer.getId());
        return new GpuServerStatusResponse(gpuServer.getIsOn(), gpuBoard.getIsWorking());
    }

    private void validateLab(Long labId) {
        if (!labRepository.existsById(labId)) {
            throw LabException.LAB_NOT_FOUND.getException();
        }
    }

    private Lab findLabById(Long labId) {
        return labRepository.findById(labId)
                .orElseThrow(LabException.LAB_NOT_FOUND::getException);
    }

    private GpuBoard findGpuBoardByServerId(Long gpuServerId) {
        return gpuBoardRepository.findByGpuServerId(gpuServerId)
                .orElseThrow(GpuBoardException.GPU_BOARD_NOT_FOUND::getException);
    }

    private GpuServer findServerByIdAndLabId(Long labId, Long gpuServerId) {
        return gpuServerRepository.findByIdAndLabId(gpuServerId, labId)
                .orElseThrow(GpuServerException.GPU_SERVER_NOT_FOUND::getException);
    }
}
