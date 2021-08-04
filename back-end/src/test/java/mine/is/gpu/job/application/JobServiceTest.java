package mine.is.gpu.job.application;

import static mine.is.gpu.job.fixture.JobFixtures.jobCreationRequest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.gpuserver.domain.repository.GpuBoardRepository;
import mine.is.gpu.gpuserver.domain.repository.GpuServerRepository;
import mine.is.gpu.gpuserver.exception.GpuBoardException;
import mine.is.gpu.job.domain.Job;
import mine.is.gpu.job.domain.JobStatus;
import mine.is.gpu.job.domain.repository.JobRepository;
import mine.is.gpu.job.dto.request.JobRequest;
import mine.is.gpu.job.dto.response.JobResponse;
import mine.is.gpu.job.dto.response.JobResponses;
import mine.is.gpu.job.exception.JobException;
import mine.is.gpu.lab.domain.Lab;
import mine.is.gpu.lab.domain.repository.LabRepository;
import mine.is.gpu.member.domain.Member;
import mine.is.gpu.member.domain.MemberType;
import mine.is.gpu.member.domain.repository.MemberRepository;
import mine.is.gpu.member.exception.MemberException;
import mine.is.gpu.worker.domain.Log;
import mine.is.gpu.worker.domain.repository.LogRepository;
import java.util.Arrays;
import java.util.stream.Collectors;
import org.assertj.core.api.Assertions;
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
    @Autowired
    private LogRepository logRepository;
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
        Long id = jobService.save(memberId, jobRequest);
        assertThat(id).isNotNull();
    }

    @Test
    @DisplayName("존재하지 않는 멤버 job등록시 에러 발생")
    void insertNotExistingMember() {
        Long notExistingMemberId = Long.MAX_VALUE;
        JobRequest jobRequest = new JobRequest(serverId, "job", "metadata", "12");

        assertThatThrownBy(() -> jobService.save(notExistingMemberId, jobRequest))
                .isEqualTo(MemberException.MEMBER_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("존재하지 않는 서버 job등록시 에러 발생")
    void insertNotExistingServer() {
        Long notExistingServerId = Long.MAX_VALUE;
        JobRequest jobRequest = new JobRequest(notExistingServerId, "job", "metadata", "12");

        assertThatThrownBy(() -> jobService.save(memberId, jobRequest))
                .isEqualTo(GpuBoardException.GPU_BOARD_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("정상 조회")
    void findById() {
        JobRequest jobRequest = new JobRequest(serverId, "job", "metadata", "12");
        Long jobId = jobService.save(memberId, jobRequest);

        JobResponse jobResponse = jobService.findById(jobId);
        assertThat(jobResponse).isNotNull();
    }

    @Test
    @DisplayName("예약을 취소한다.")
    void findCancel() {
        JobRequest jobRequest = new JobRequest(serverId, "job", "metadata", "12");
        Long jobId = jobService.save(memberId, jobRequest);

        jobService.cancel(jobId);

        JobResponse jobResponse = jobService.findById(jobId);
        Assertions.assertThat(jobResponse.getStatus()).isEqualTo(JobStatus.CANCELED);
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
        Long jobId = jobService.save(memberId, jobRequest);

        Job job = jobRepository.findById(jobId).get();
        job.changeStatus(JobStatus.RUNNING);

        assertThatThrownBy(() -> jobService.cancel(jobId))
                .isEqualTo(JobException.NO_WAITING_JOB.getException());
    }

    @Test
    @DisplayName("존재하지 않는 Job Id로 예약을 취소할 수 없다.")
    void cancelWithNotExistingId() {
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

    @Test
    @DisplayName("로그 정보 모두 조회")
    void findAllLogsByJob() {
        //given
        Lab lab1 = new Lab("lab1");
        labRepository.save(lab1);
        GpuServer gpuServer1 = new GpuServer("server1", true, 1024L, 1024L, lab1);
        gpuServerRepository.save(gpuServer1);
        GpuBoard gpuBoard1 = new GpuBoard(true, 600L, "NVIDIA42", gpuServer1);
        gpuBoardRepository.save(gpuBoard1);
        Member member1 = new Member("email@email.com", "password", "name1", MemberType.MANAGER,
                lab1);
        memberRepository.save(member1);
        Job job1 = new Job("job1", JobStatus.COMPLETED, gpuBoard1, member1, "metaData", "10");
        jobRepository.save(job1);

        logRepository.save(new Log("content1", job1));
        logRepository.save(new Log("content1", job1));
        logRepository.save(new Log("content1", job1));

        Assertions.assertThat(jobService.findLogAllById(job1.getId()).getLogs()).hasSize(3);
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
            Long jobId1 = jobService.save(memberId, jobCreationRequest(saveGpuServerInLab(lab)));
            Long jobId2 = jobService.save(memberId, jobCreationRequest(saveGpuServerInLab(lab)));

            assertJobIdsFromJobResponses(jobService.findJobsOfMember(memberId, null), jobId1,
                    jobId2);
        }

        @Test
        @DisplayName("서버를 기준으로 포함된 Job을 조회한다.")
        void findAllByServer() {
            Long jobId1 = jobService.save(saveMember(lab), jobCreationRequest(serverId));
            Long jobId2 = jobService.save(saveMember(lab), jobCreationRequest(serverId));

            assertJobIdsFromJobResponses(jobService.findJobs(lab.getId(), serverId, null), jobId1,
                    jobId2);
        }

        @Test
        @DisplayName("랩을 기준으로 포함된 Job을 조회한다.")
        void findAllByLab() {
            Long jobId1 = jobService
                    .save(saveMember(lab), jobCreationRequest(saveGpuServerInLab(lab)));
            Long jobId2 = jobService
                    .save(saveMember(lab), jobCreationRequest(saveGpuServerInLab(lab)));

            assertJobIdsFromJobResponses(jobService.findJobs(lab.getId(), null, null), jobId1,
                    jobId2);
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