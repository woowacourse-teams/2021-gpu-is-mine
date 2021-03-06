package mine.is.gpu.gpuserver.application;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.gpuserver.domain.repository.GpuBoardRepository;
import mine.is.gpu.gpuserver.domain.repository.GpuServerRepository;
import mine.is.gpu.gpuserver.dto.request.GpuBoardRequest;
import mine.is.gpu.gpuserver.dto.request.GpuServerRequest;
import mine.is.gpu.gpuserver.dto.response.GpuServerResponse;
import mine.is.gpu.gpuserver.dto.response.GpuServerStatusResponse;
import mine.is.gpu.gpuserver.dto.response.GpuServerMainPageResponse;
import mine.is.gpu.gpuserver.dto.response.GpuServerMainPageResponses;
import mine.is.gpu.gpuserver.exception.GpuBoardException;
import mine.is.gpu.gpuserver.exception.GpuServerException;
import mine.is.gpu.job.domain.Job;
import mine.is.gpu.job.domain.JobStatus;
import mine.is.gpu.job.domain.repository.JobRepository;
import mine.is.gpu.lab.domain.Lab;
import mine.is.gpu.lab.domain.repository.LabRepository;
import mine.is.gpu.lab.exception.LabException;
import org.springframework.data.domain.Pageable;
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

    @Transactional
    public void updateById(Long gpuServerId, GpuServerRequest gpuServerRequest) {
        GpuServer gpuServer = findGpuServerById(gpuServerId);
        Lab lab = gpuServer.getLab();
        checkDuplicate(lab.getId(), gpuServerRequest.getServerName());

        gpuServer.setName(gpuServerRequest.getServerName());
        gpuServer.setMemorySize(gpuServerRequest.getMemorySize());
        gpuServer.setDiskSize(gpuServerRequest.getDiskSize());

        GpuBoardRequest gpuBoardRequest = gpuServerRequest.getGpuBoardRequest();
        GpuBoard gpuBoard = findGpuBoardByServerId(gpuServerId);

        gpuBoard.setPerformance(gpuBoardRequest.getPerformance());
        gpuBoard.setModelName(gpuBoardRequest.getModelName());
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
        checkDuplicate(labId, gpuServerRequest.getServerName());
        Lab lab = findLabById(labId);

        GpuServer gpuServer = gpuServerRequest.toEntity(lab);
        gpuServerRepository.save(gpuServer);

        GpuBoardRequest gpuBoardRequest = gpuServerRequest.getGpuBoardRequest();
        gpuBoardRepository.save(gpuBoardRequest.toEntity(gpuServer));

        return gpuServer.getId();
    }

    private void checkDuplicate(Long labId, String name) {
        if (gpuServerRepository.existsByLabIdAndName(labId, name)) {
            throw GpuServerException.DUPLICATE_NAME_EXCEPTION.getException();
        }
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

    @Transactional(readOnly = true)
    public List<GpuServer> findAllByLabId(Long labId) {
        return findAllByLabId(labId, null);
    }

    private List<GpuServer> findAllByLabId(Long labId, Pageable pageable) {
        if (Objects.isNull(pageable)) {
            gpuServerRepository.findAllByLabId(labId);
        }
        return gpuServerRepository.findAllByLabId(labId, pageable);
    }

    @Transactional(readOnly = true)
    public GpuServerMainPageResponses findAllInLab(Long labId, Pageable pageable) {
        validateLab(labId);

        List<GpuServer> gpuServers = findAllByLabId(labId, pageable);
        List<GpuServerMainPageResponse> gpuServerMainPageRespons = gpuServers.stream()
                .map(this::summaryResponse)
                .collect(Collectors.toList());

        return GpuServerMainPageResponses.of(gpuServerMainPageRespons);
    }

    private GpuServerMainPageResponse summaryResponse(GpuServer server) {
        GpuBoard gpuBoard = findGpuBoardByServerId(server.getId());

        List<Job> runningJobs = jobRepository.findAllByGpuBoardIdAndStatus(gpuBoard.getId(), JobStatus.RUNNING);
        List<Job> waitingJobs = jobRepository.findAllByGpuBoardIdAndStatus(gpuBoard.getId(), JobStatus.WAITING);

        Long totalExpectedTime = waitingJobs.stream()
                .mapToLong(job -> Long.parseLong(job.getExpectedTime()))
                .sum();
        return GpuServerMainPageResponse.of(server, gpuBoard, runningJobs, waitingJobs.size(), totalExpectedTime);
    }
}
