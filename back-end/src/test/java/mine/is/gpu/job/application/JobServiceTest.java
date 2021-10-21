package mine.is.gpu.job.application;

import static mine.is.gpu.job.fixture.JobFixtures.jobCreationRequest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import mine.is.gpu.account.domain.Member;
import mine.is.gpu.account.domain.MemberType;
import mine.is.gpu.account.domain.repository.MemberRepository;
import mine.is.gpu.account.exception.MemberException;
import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.gpuserver.domain.repository.GpuBoardRepository;
import mine.is.gpu.gpuserver.domain.repository.GpuServerRepository;
import mine.is.gpu.gpuserver.exception.GpuBoardException;
import mine.is.gpu.job.domain.Job;
import mine.is.gpu.job.domain.JobStatus;
import mine.is.gpu.job.domain.repository.JobRepository;
import mine.is.gpu.job.dto.request.JobRequest;
import mine.is.gpu.job.dto.request.JobUpdateRequest;
import mine.is.gpu.job.dto.response.JobResponse;
import mine.is.gpu.job.dto.response.JobResponses;
import mine.is.gpu.job.exception.JobException;
import mine.is.gpu.lab.domain.Lab;
import mine.is.gpu.lab.domain.repository.LabRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@ActiveProfiles("test")
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

        JobResponse jobResponse = jobService.findById(memberId, jobId);
        assertThat(jobResponse).isNotNull();
    }

    @Test
    @DisplayName("예약을 취소한다.")
    void findCancel() {
        JobRequest jobRequest = new JobRequest(serverId, "job", "metadata", "12");
        Long jobId = jobService.save(memberId, jobRequest);

        jobService.cancel(memberId, jobId);

        JobResponse jobResponse = jobService.findById(memberId, jobId);
        Assertions.assertThat(jobResponse.getStatus()).isEqualTo(JobStatus.CANCELED);
    }

    @Test
    @DisplayName("대기 중인 JobId만 예약을 취소할 수 있다.")
    void findCancelWithNotWaitingJob() {
        JobRequest jobRequest = new JobRequest(serverId, "job", "metadata", "12");
        Long jobId = jobService.save(memberId, jobRequest);

        Job job = jobRepository.findById(jobId).get();
        job.changeStatus(JobStatus.RUNNING);

        assertThatThrownBy(() -> jobService.cancel(memberId, jobId))
                .isEqualTo(JobException.NO_WAITING_JOB.getException());
    }

    @Test
    @DisplayName("존재하지 않는 Job Id로 예약을 취소할 수 없다.")
    void cancelWithNotExistingId() {
        Long notExistingJobId = Long.MAX_VALUE;

        assertThatThrownBy(() -> jobService.cancel(memberId, notExistingJobId))
                .isEqualTo(JobException.JOB_NOT_FOUND.getException());
    }

    private Long saveGpuServerInLab(Lab lab) {
        GpuServer server = new GpuServer("server", true, 1024L, 1024L, lab);
        gpuServerRepository.save(server);

        GpuBoard board = new GpuBoard(false, 600L, "nvdia", server);
        gpuBoardRepository.save(board);

        return server.getId();
    }

    private Long saveGpuServerInLab(Lab lab, String name) {
        GpuServer server = new GpuServer(name, true, 1024L, 1024L, lab);
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

    private Long saveMember(Lab lab, String email) {
        Member member = new Member(email, "password", "name", MemberType.USER, lab);
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
            memberId = saveMember(lab, "email2");
            serverId = saveGpuServerInLab(lab, "server2");
        }

        @Test
        @DisplayName("멤버를 기준으로 작성한 Job을 조회한다.")
        void findAllByMemberId() {
            Long jobId1 = jobService.save(memberId, jobCreationRequest(saveGpuServerInLab(lab, "server3")));
            Long jobId2 = jobService.save(memberId, jobCreationRequest(saveGpuServerInLab(lab, "server4")));

            assertJobIdsFromJobResponses(jobService.findJobsOfMember(memberId, null, null), jobId1,
                    jobId2);
        }

        @Test
        @DisplayName("서버를 기준으로 포함된 Job을 조회한다.")
        void findAllByServer() {
            Long jobId1 = jobService.save(saveMember(lab, "email3"), jobCreationRequest(serverId));
            Long jobId2 = jobService.save(saveMember(lab, "email4"), jobCreationRequest(serverId));

            assertJobIdsFromJobResponses(jobService.findJobs(lab.getId(), serverId, null, null), jobId1,
                    jobId2);
        }

        @Test
        @DisplayName("랩을 기준으로 포함된 Job을 조회한다.")
        void findAllByLab() {
            Long jobId1 = jobService
                    .save(saveMember(lab, "email3"), jobCreationRequest(saveGpuServerInLab(lab, "server3")));
            Long jobId2 = jobService
                    .save(saveMember(lab, "email4"), jobCreationRequest(saveGpuServerInLab(lab, "server4")));

            assertJobIdsFromJobResponses(jobService.findJobs(lab.getId(), null, null, null), jobId1,
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

    @Test
    @DisplayName("예약을 수정한다.")
    void update() {
        JobRequest jobRequest = new JobRequest(serverId, "job", "metadata", "12");
        Long jobId = jobService.save(memberId, jobRequest);

        JobUpdateRequest jobUpdateRequest = new JobUpdateRequest("newJob");
        jobService.update(jobId, jobUpdateRequest);

        JobResponse jobResponse = jobService.findById(memberId, jobId);
        Assertions.assertThat(jobResponse.getName()).isEqualTo(jobUpdateRequest.getName());
    }

    @Nested
    @DisplayName("다중 조회 시 페이지네이션을 적용한다.")
    class FindAllWithPagination {

        Lab lab = new Lab("labA");
        Long memberId;
        Long serverId;
        String jobBaseName = "job";
        Pageable pageable = PageRequest.of(2, 3);

        @BeforeEach
        void setUp() {
            labRepository.save(lab);
            memberId = saveMember(lab, "email2");
            serverId = saveGpuServerInLab(lab, "server2");
            saveDummyJobs(30);
        }

        @Test
        @DisplayName("랩별 잡 조회 시 페이지네이션 적용을 확인한다.")
        void findJobs() {
            JobResponses searched = jobService.findJobs(lab.getId(), null, null, pageable);
            List<String> searchedNames = searched.getJobResponses().stream()
                    .map(JobResponse::getName)
                    .collect(Collectors.toList());

            List<String> expectedNames = IntStream.range(0, pageable.getPageSize())
                    .mapToObj(i -> jobBaseName + (pageable.getPageSize() * pageable.getPageNumber() + i))
                    .collect(Collectors.toList());

            assertThat(expectedNames).isEqualTo(searchedNames);
        }

        @Test
        void findJobsOfMember() {
            JobResponses searched = jobService.findJobsOfMember(memberId, null, pageable);
            List<String> searchedNames = searched.getJobResponses().stream()
                    .map(JobResponse::getName)
                    .collect(Collectors.toList());

            List<String> expectedNames = IntStream.range(0, pageable.getPageSize())
                    .mapToObj(i -> jobBaseName + (pageable.getPageSize() * pageable.getPageNumber() + i))
                    .collect(Collectors.toList());

            assertThat(expectedNames).isEqualTo(searchedNames);
        }

        private void saveDummyJobs(int count) {
            IntStream.range(0, count)
                    .mapToObj(i -> jobBaseName + i)
                    .forEach(
                            name -> jobService.save(memberId, jobCreationRequest(name, saveGpuServerInLab(lab, name))));
        }
    }
}
