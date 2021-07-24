package admin.job.application;

import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import admin.gpuserver.domain.repository.GpuBoardRepository;
import admin.gpuserver.domain.repository.GpuServerRepository;
import admin.gpuserver.exception.GpuBoardException;
import admin.job.domain.Job;
import admin.job.domain.JobStatus;
import admin.job.domain.repository.JobRepository;
import admin.job.dto.request.JobRequest;
import admin.job.dto.response.JobResponse;
import admin.job.exception.JobException;
import admin.lab.domain.Lab;
import admin.lab.domain.repository.LabRepository;
import admin.member.domain.Member;
import admin.member.domain.MemberType;
import admin.member.domain.repository.MemberRepository;
import admin.member.exception.MemberException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static admin.job.fixture.JobFixtures.jobCreationRequest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@Transactional
class JobServiceTest {
    @Autowired
    private JobService jobService;
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private GpuBoardRepository gpuBoardRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private LabRepository labRepository;
    @Autowired
    private GpuServerRepository gpuServerRepository;
    private Long serverId;
    private Lab lab;
    private Long memberId;

    @BeforeEach
    void setUp() {
        lab = new Lab("lab");
        labRepository.save(lab);

        serverId = saveGpuServerInLab(lab);

        memberId = saveMember(lab);
    }

    @Test
    @DisplayName("정상 등록")
    void insert() {
        JobRequest jobRequest = jobCreationRequest(serverId);
        Long id = jobService.insert(memberId, jobRequest);

        JobResponse response = jobService.findById(id);

        assertThat(response.getName()).isEqualTo(jobRequest.getName());
        assertThat(response.getStatus()).isEqualTo(JobStatus.WAITING);
    }

    @Test
    @DisplayName("존재하지 않는 멤버 id로 job 등록 시 에러 발생")
    void insertNotExistingMember() {
        Long notExistingMemberId = Long.MAX_VALUE;

        assertThatThrownBy(() -> {
            jobService.insert(notExistingMemberId, jobCreationRequest(serverId));
        }).isEqualTo(MemberException.MEMBER_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("존재하지 않는 서버 id로 job 등록 시 에러 발생")
    void insertNotExistingServer() {
        Long notExistingServerId = Long.MAX_VALUE;

        assertThatThrownBy(() -> {
            jobService.insert(memberId, jobCreationRequest(notExistingServerId));
        }).isEqualTo(GpuBoardException.GPU_BOARD_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("삭제된 서버 id로 job 등록 시 에러 발생")
    void insertWithDeletedServer() {
        GpuServer gpuServer = gpuServerRepository.findById(serverId).get();
        gpuServer.setDeleted(true);

        assertThatThrownBy(() -> {
            jobService.insert(memberId, jobCreationRequest(serverId));
        }).isEqualTo(GpuBoardException.GPU_BOARD_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("Job 예약을 취소한다.")
    void cancelJob() {
        JobRequest jobRequest = new JobRequest(serverId, "name", "metaData", "expectedTime");
        Long jobId = jobService.insert(memberId, jobRequest);

        jobService.cancel(jobId);

        Job actualJob = jobRepository.findById(jobId).get();
        assertThat(actualJob.getStatus()).isEqualTo(JobStatus.CANCELED);
    }

    @Test
    @DisplayName("id로 job을 조회한다.")
    void findById() {
        JobRequest jobRequest = new JobRequest(serverId, "name", "metaData", "expectedTime");
        Long jobId = jobService.insert(memberId, jobRequest);

        Job actualJob = jobRepository.findById(jobId).get();

        JobResponse jobResponse = jobService.findById(jobId);
        assertThat(jobResponse.getName()).isEqualTo(actualJob.getName());
        assertThat(jobResponse.getGpuServerName()).isEqualTo(actualJob.getGpuServer().getName());
        assertThat(jobResponse.getMemberName()).isEqualTo(actualJob.getMember().getName());
    }

    @Test
    @DisplayName("존재하지 않는 Job Id로 조회")
    void findByNotExistingId() {
        Long notExistingJobId = Long.MAX_VALUE;

        assertThatThrownBy(() -> jobService.findById(notExistingJobId))
                .isEqualTo(JobException.JOB_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("멤버를 기준으로 작성한 Job을 조회한다.")
    void findAllByMemberId() {
        Long baseServerId = saveGpuServerInLab(lab);
        Long otherServerId = saveGpuServerInLab(lab);
        Long baseMemberId = saveMember(lab);
        Long otherMemberId = saveMember(lab);

        Long id1 = jobService.insert(baseMemberId, jobCreationRequest(baseServerId));
        Long id2 = jobService.insert(baseMemberId, jobCreationRequest(otherServerId));
        Long id3 = jobService.insert(otherMemberId, jobCreationRequest(baseServerId));
        Long id4 = jobService.insert(otherMemberId, jobCreationRequest(otherServerId));

        List<Long> searchedIds = jobService.findByMember(baseMemberId).getJobResponses().stream()
                .map(JobResponse::getId)
                .collect(Collectors.toList());

        assertThat(searchedIds).usingRecursiveComparison().isEqualTo(Arrays.asList(id1, id2));
    }

    @Test
    @DisplayName("서버를 기준으로 포함된 Job을 조회한다.")
    void findAllByServer() {
        Long baseServerId = saveGpuServerInLab(lab);
        Long otherServerId = saveGpuServerInLab(lab);
        Long baseMemberId = saveMember(lab);
        Long otherMemberId = saveMember(lab);

        Long id1 = jobService.insert(baseMemberId, jobCreationRequest(baseServerId));
        Long id2 = jobService.insert(baseMemberId, jobCreationRequest(otherServerId));
        Long id3 = jobService.insert(otherMemberId, jobCreationRequest(baseServerId));
        Long id4 = jobService.insert(otherMemberId, jobCreationRequest(otherServerId));

        List<Long> searchedIds = jobService.findByServer(baseServerId).getJobResponses().stream()
                .map(JobResponse::getId)
                .collect(Collectors.toList());

        assertThat(searchedIds).usingRecursiveComparison().isEqualTo(Arrays.asList(id1, id3));
    }

    @Test
    @DisplayName("랩을 기준으로 포함된 Job을 조회한다.")
    void findAllByLab() {
        Lab baseLab = new Lab("baseLab");
        labRepository.save(baseLab);

        Lab otherLab = new Lab("otherLab");
        labRepository.save(otherLab);

        Long serverInBaseLabId1 = saveGpuServerInLab(baseLab);
        Long serverInBaseLabId2 = saveGpuServerInLab(baseLab);
        Long serverInOtherLabId = saveGpuServerInLab(otherLab);

        Long id1 = jobService.insert(memberId, jobCreationRequest(serverInBaseLabId1));
        Long id2 = jobService.insert(memberId, jobCreationRequest(serverInBaseLabId2));
        Long id3 = jobService.insert(memberId, jobCreationRequest(serverInOtherLabId));

        List<Long> searchedIds = jobService.findByLab(baseLab.getId()).getJobResponses().stream()
                .map(JobResponse::getId)
                .collect(Collectors.toList());

        assertThat(searchedIds).usingRecursiveComparison().isEqualTo(Arrays.asList(id1, id2));
    }

    private Long saveGpuServerInLab(Lab lab) {
        GpuServer server = new GpuServer("server", true, 1024L, 1024L, lab);
        gpuServerRepository.save(server);

        GpuBoard board = new GpuBoard(false, 600L, "nvdia", server);
        gpuBoardRepository.save(board);

        return server.getId();
    }

    private Long saveMember(Lab lab) {
        Member member = new Member("email", "password", "name", MemberType.USER, lab);
        memberRepository.save(member);
        return member.getId();
    }
}
