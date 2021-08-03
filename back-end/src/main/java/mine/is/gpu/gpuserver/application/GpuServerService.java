package mine.is.gpu.gpuserver.application;

import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.gpuserver.domain.repository.GpuBoardRepository;
import mine.is.gpu.gpuserver.domain.repository.GpuServerRepository;
import mine.is.gpu.gpuserver.dto.request.GpuBoardRequest;
import mine.is.gpu.gpuserver.dto.request.GpuServerRequest;
import mine.is.gpu.gpuserver.dto.request.GpuServerUpdateRequest;
import mine.is.gpu.gpuserver.dto.response.GpuServerResponse;
import mine.is.gpu.gpuserver.dto.response.GpuServerResponses;
import mine.is.gpu.gpuserver.dto.response.GpuServerStatusResponse;
import mine.is.gpu.gpuserver.exception.GpuBoardException;
import mine.is.gpu.gpuserver.exception.GpuServerException;
import mine.is.gpu.job.domain.Job;
import mine.is.gpu.job.domain.repository.JobRepository;
import mine.is.gpu.lab.domain.Lab;
import mine.is.gpu.lab.domain.repository.LabRepository;
import mine.is.gpu.lab.exception.LabException;
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
    public GpuServerResponse findById(Long gpuServerId) {
        GpuServer gpuServer = findGpuServerById(gpuServerId);
        GpuBoard gpuBoard = findGpuBoardByServerId(gpuServerId);

        List<Job> jobsInBoard = jobRepository.findAllByGpuBoardId(gpuBoard.getId());
        return GpuServerResponse.of(gpuServer, gpuBoard, jobsInBoard);
    }

    @Transactional(readOnly = true)
    public GpuServerResponses findAllInLab(Long labId) {
        validateLab(labId);

        List<GpuServer> gpuServers = gpuServerRepository.findAllByLabId(labId);
        List<GpuServerResponse> gpuServerResponses = gpuServers.stream()
                .map(server -> findById(server.getId()))
                .collect(Collectors.toList());
        return GpuServerResponses.of(gpuServerResponses);
    }

    @Transactional(readOnly = true)
    public List<GpuServer> findAllByLabId(Long labId) {
        return gpuServerRepository.findAllByLabId(labId);
    }

    @Transactional
    public void updateById(Long gpuServerId, GpuServerUpdateRequest updateRequest) {
        GpuServer gpuServer = findGpuServerById(gpuServerId);
        gpuServer.update(updateRequest.getName());
    }

    @Transactional
    public void deleteById(Long gpuServerId) {
        GpuServer gpuServer = findGpuServerById(gpuServerId);
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
    public GpuServerStatusResponse findStatusById(Long gpuServerId) {
        GpuServer gpuServer = findGpuServerById(gpuServerId);
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

    private GpuServer findGpuServerById(Long gpuServerId) {
        return gpuServerRepository.findById(gpuServerId)
                .orElseThrow(GpuServerException.GPU_SERVER_NOT_FOUND::getException);
    }
}
