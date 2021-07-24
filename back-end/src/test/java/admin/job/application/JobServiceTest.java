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
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Collections;
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
    private Long memberId;

    @BeforeEach
    void setUp() {
        Lab lab = new Lab("lab");
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

    @Nested
    @DisplayName("멤버, 서버, 랩을 기준으로 Job을 조회한다.")
    class findAll {
        Lab labA = new Lab("labA");
        Lab labB = new Lab("labB");

        Long memberA;
        Long memberB;

        Long serverA;
        Long serverB;

        @BeforeEach
        void setUp() {
            labRepository.save(labA);
            labRepository.save(labB);

            memberA = saveMember(labA);
            memberB = saveMember(labB);

            serverA = saveGpuServerInLab(labA);
            serverB = saveGpuServerInLab(labB);
        }

        @Test
        @DisplayName("멤버를 기준으로 작성한 Job을 조회한다.")
        void findAllByMemberId() {
            serverB = saveGpuServerInLab(labA);

            Long jobA = jobService.insert(memberA, jobCreationRequest(serverA));
            Long jobB = jobService.insert(memberA, jobCreationRequest(serverA));
            Long jobC = jobService.insert(memberA, jobCreationRequest(serverB));

            assertThat(
                    jobService.findByMember(memberA).getJobResponses().stream()
                            .map(JobResponse::getId)
                            .collect(Collectors.toList())
            ).usingRecursiveComparison().isEqualTo(Arrays.asList(jobA, jobB, jobC));
        }

        @Test
        @DisplayName("서버를 기준으로 포함된 Job을 조회한다.")
        void findAllByServer() {
            memberB = saveMember(labA);

            Long jobA = jobService.insert(memberA, jobCreationRequest(serverA));
            Long jobB = jobService.insert(memberA, jobCreationRequest(serverA));
            Long jobC = jobService.insert(memberB, jobCreationRequest(serverA));

            assertThat(
                    jobService.findByServer(serverA).getJobResponses().stream()
                            .map(JobResponse::getId)
                            .collect(Collectors.toList())
            ).usingRecursiveComparison().isEqualTo(Arrays.asList(jobA, jobB, jobC));
        }

        @Test
        @DisplayName("랩을 기준으로 포함된 Job을 조회한다.")
        void findAllByLab() {
            Long jobA = jobService.insert(memberA, jobCreationRequest(serverA));
            Long jobB = jobService.insert(memberB, jobCreationRequest(serverB));

            assertThat(
                    jobService.findByLab(labA.getId()).getJobResponses().stream()
                            .map(JobResponse::getId)
                            .collect(Collectors.toList())
            ).usingRecursiveComparison().isEqualTo(Collections.singletonList(jobA));
        }
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
