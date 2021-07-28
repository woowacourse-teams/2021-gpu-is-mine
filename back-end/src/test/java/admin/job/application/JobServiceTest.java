package admin.job.application;

import static admin.job.fixture.JobFixtures.jobCreationRequest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

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
import admin.job.dto.response.JobResponses;
import admin.job.exception.JobException;
import admin.lab.domain.Lab;
import admin.lab.domain.repository.LabRepository;
import admin.member.domain.Member;
import admin.member.domain.MemberType;
import admin.member.domain.repository.MemberRepository;
import admin.member.exception.MemberException;
import java.util.Arrays;
import java.util.stream.Collectors;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

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
        JobRequest jobRequest = new JobRequest(serverId, "job", "metadata", "12");
        Long id = jobService.insert(memberId, jobRequest);
        assertThat(id).isNotNull();
    }

    @Test
    @DisplayName("존재하지 않는 멤버 job등록시 에러 발생")
    void insertNotExistingMember() {
        Long notExistingMemberId = Long.MAX_VALUE;
        JobRequest jobRequest = new JobRequest(serverId, "job", "metadata", "12");

        assertThatThrownBy(() -> jobService.insert(notExistingMemberId, jobRequest))
                .isEqualTo(MemberException.MEMBER_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("존재하지 않는 서버 job등록시 에러 발생")
    void insertNotExistingServer() {
        Long notExistingServerId = Long.MAX_VALUE;
        JobRequest jobRequest = new JobRequest(notExistingServerId, "job", "metadata", "12");

        assertThatThrownBy(() -> jobService.insert(memberId, jobRequest))
                .isEqualTo(GpuBoardException.GPU_BOARD_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("정상 조회")
    void findById() {
        JobRequest jobRequest = new JobRequest(serverId, "job", "metadata", "12");
        Long jobId = jobService.insert(memberId, jobRequest);

        JobResponse jobResponse = jobService.findById(jobId);
        assertThat(jobResponse).isNotNull();
    }

    @Test
    @DisplayName("예약을 취소한다.")
    void findCancel() {
        JobRequest jobRequest = new JobRequest(serverId, "job", "metadata", "12");
        Long jobId = jobService.insert(memberId, jobRequest);

        jobService.cancel(jobId);

        JobResponse jobResponse = jobService.findById(jobId);
        assertThat(jobResponse.getStatus()).isEqualTo(JobStatus.CANCELED);
    }

    @Test
    @DisplayName("존재하지 않는 JobId로 예약을 취소한다.")
    void findCancelWithNotExistingJob() {
        Long notExistingServerId = Long.MAX_VALUE;

        assertThatThrownBy(() -> jobService.cancel(notExistingServerId))
                .isEqualTo(JobException.JOB_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("대기 중인 JobId만 예약을 취소할 수 있다.")
    void findCancelWithNotWaitingJob() {
        JobRequest jobRequest = new JobRequest(serverId, "job", "metadata", "12");
        Long jobId = jobService.insert(memberId, jobRequest);

        Job job = jobRepository.findById(jobId).get();
        job.changeStatus(JobStatus.RUNNING);

        assertThatThrownBy(() -> jobService.cancel(jobId))
                .isEqualTo(JobException.NO_WAITING_JOB.getException());
    }

    @Test
    @DisplayName("존재하지 않는 Job Id로 조회")
    void findByNotExistingId() {
        Long notExistingJobId = Long.MAX_VALUE;

        assertThatThrownBy(() -> jobService.cancel(notExistingJobId))
                .isEqualTo(JobException.JOB_NOT_FOUND.getException());
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

    @Nested
    @DisplayName("멤버, 서버, 랩을 기준으로 Job을 조회한다.")
    class FindAll {
        Lab lab = new Lab("labA");
        Long memberId;
        Long serverId;

        @BeforeEach
        void setUp() {
            labRepository.save(lab);
            memberId = saveMember(lab);
            serverId = saveGpuServerInLab(lab);
        }

        @Test
        @DisplayName("멤버를 기준으로 작성한 Job을 조회한다.")
        void findAllByMemberId() {
            Long jobId1 = jobService.insert(memberId, jobCreationRequest(saveGpuServerInLab(lab)));
            Long jobId2 = jobService.insert(memberId, jobCreationRequest(saveGpuServerInLab(lab)));

            assertJobIdsFromJobResponses(jobService.findJobsOfMember(memberId, null), jobId1, jobId2);
        }

        @Test
        @DisplayName("서버를 기준으로 포함된 Job을 조회한다.")
        void findAllByServer() {
            Long jobId1 = jobService.insert(saveMember(lab), jobCreationRequest(serverId));
            Long jobId2 = jobService.insert(saveMember(lab), jobCreationRequest(serverId));

            assertJobIdsFromJobResponses(jobService.findJobs(lab.getId(), serverId, null), jobId1, jobId2);
        }

        @Test
        @DisplayName("랩을 기준으로 포함된 Job을 조회한다.")
        void findAllByLab() {
            Long jobId1 = jobService.insert(saveMember(lab), jobCreationRequest(saveGpuServerInLab(lab)));
            Long jobId2 = jobService.insert(saveMember(lab), jobCreationRequest(saveGpuServerInLab(lab)));

            assertJobIdsFromJobResponses(jobService.findJobs(lab.getId(), null, null), jobId1, jobId2);
        }

        private void assertJobIdsFromJobResponses(JobResponses responses, Long... jobIds) {
            assertThat(
                    responses.getJobResponses().stream()
                            .map(JobResponse::getId)
                            .collect(Collectors.toList())
            ).usingRecursiveComparison().isEqualTo(Arrays.asList(jobIds));
        }
    }
}
