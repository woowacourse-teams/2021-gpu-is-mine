package admin.job.application;

import admin.gpuserver.application.GpuServerService;
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

import static admin.gpuserver.fixture.gpuServerFixtures.gpuServerRequestWithDummyValue;
import static admin.job.fixture.JobFixtures.jobRequestWithDummyValue;
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
    private GpuServerService gpuServerService;
    @Autowired
    private GpuBoardRepository gpuBoardRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private LabRepository labRepository;
    @Autowired
    private GpuServerRepository gpuServerRepository;
    private GpuServer server;
    private GpuBoard board;
    private Lab lab;
    private Member member;

    @BeforeEach
    void setUp() {
        lab = new Lab("lab");
        labRepository.save(lab);

        server = new GpuServer("server", true, 1024L, 1024L, lab);
        gpuServerRepository.save(server);

        board = new GpuBoard(false, 600L, "nvdia", server);
        gpuBoardRepository.save(board);

        member = saveMember(lab);
    }

    @Test
    @DisplayName("정상 등록")
    void insert() {
        JobRequest jobRequest = jobRequestWithDummyValue(server.getId());
        Long id = jobService.insert(member.getId(), jobRequest);

        JobResponse response = jobService.findById(id);

        assertThat(response.getName()).isEqualTo(jobRequest.getName());
        assertThat(response.getStatus()).isEqualTo(JobStatus.WAITING);
    }

    @Test
    @DisplayName("존재하지 않는 멤버 id로 job 등록 시 에러 발생")
    void insertNotExistingMember() {
        Long notExistingMemberId = Long.MAX_VALUE;
        JobRequest jobRequest = jobRequestWithDummyValue(server.getId());

        assertThatThrownBy(() -> jobService.insert(notExistingMemberId, jobRequest))
                .isEqualTo(MemberException.MEMBER_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("존재하지 않는 서버 id로 job 등록 시 에러 발생")
    void insertNotExistingServer() {
        Long notExistingServerId = Long.MAX_VALUE;
        JobRequest jobRequest = jobRequestWithDummyValue(notExistingServerId);

        assertThatThrownBy(() -> jobService.insert(member.getId(), jobRequest))
                .isEqualTo(GpuBoardException.GPU_BOARD_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("삭제된 서버 id로 job 등록 시 에러 발생")
    void insertWithDeletedServer() {
        server.setDeleted(true);
        JobRequest jobRequest = jobRequestWithDummyValue(server.getId());

        assertThatThrownBy(() -> jobService.insert(member.getId(), jobRequest))
                .isEqualTo(GpuBoardException.GPU_BOARD_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("Job 예약을 취소한다.")
    void cancelJob() {
        Job job = new Job("job", board, member);
        jobRepository.save(job);

        jobService.cancel(job.getId());
        assertThat(job.getStatus()).isEqualTo(JobStatus.CANCELED);
    }

    @Test
    @DisplayName("id로 job을 조회한다.")
    void findById() {
        Job job = new Job("job", board, member);
        jobRepository.save(job);

        JobResponse jobResponse = jobService.findById(job.getId());
        assertThat(jobResponse).isNotNull();
        assertThat(jobResponse.getName()).isEqualTo(job.getName());
        assertThat(jobResponse.getGpuServerName()).isEqualTo(board.getGpuServer().getName());
        assertThat(jobResponse.getMemberName()).isEqualTo(job.getMember().getName());
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
        Long baseServerId = insertServerInLab(lab);
        Long otherServerId = insertServerInLab(lab);
        Member baseMember = saveMember(lab);
        Member otherMember = saveMember(lab);

        Long id1 = insertJobWithDummyData(baseMember.getId(), baseServerId);
        Long id2 = insertJobWithDummyData(baseMember.getId(), otherServerId);
        Long id3 = insertJobWithDummyData(otherMember.getId(), baseServerId);
        Long id4 = insertJobWithDummyData(otherMember.getId(), otherServerId);

        List<Long> searchedIds = jobService.findByMember(baseMember.getId()).getJobResponses().stream()
                .map(JobResponse::getId)
                .collect(Collectors.toList());

        assertThat(searchedIds).usingRecursiveComparison().isEqualTo(Arrays.asList(id1, id2));
    }

    @Test
    @DisplayName("서버를 기준으로 포함된 Job을 조회한다.")
    void findAllByServer() {
        Long baseServerId = insertServerInLab(lab);
        Long otherServerId = insertServerInLab(lab);
        Member baseMember = saveMember(lab);
        Member otherMember = saveMember(lab);

        Long id1 = insertJobWithDummyData(baseMember.getId(), baseServerId);
        Long id2 = insertJobWithDummyData(baseMember.getId(), otherServerId);
        Long id3 = insertJobWithDummyData(otherMember.getId(), baseServerId);
        Long id4 = insertJobWithDummyData(otherMember.getId(), otherServerId);

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

        Long serverInOtherLabId = insertServerInLab(otherLab);
        Long serverInBaseLabId1 = insertServerInLab(baseLab);
        Long serverInBaseLabId2 = insertServerInLab(baseLab);

        Long id1 = insertJobWithDummyData(member.getId(), serverInBaseLabId1);
        Long id2 = insertJobWithDummyData(member.getId(), serverInBaseLabId2);
        Long id3 = insertJobWithDummyData(member.getId(), serverInOtherLabId);

        List<Long> searchedIds = jobService.findByLab(baseLab.getId()).getJobResponses().stream()
                .map(JobResponse::getId)
                .collect(Collectors.toList());

        assertThat(searchedIds).usingRecursiveComparison().isEqualTo(Arrays.asList(id1, id2));
    }

    private Long insertServerInLab(Lab otherLab) {
        return gpuServerService.saveGpuServer(gpuServerRequestWithDummyValue(), otherLab.getId());
    }

    private Long insertJobWithDummyData(Long memberId, Long serverId) {
        return jobService.insert(memberId, jobRequestWithDummyValue(serverId));
    }

    private Member saveMember(Lab lab) {
        Member member = new Member("email", "password", "name", MemberType.USER, lab);
        memberRepository.save(member);
        return member;
    }
}