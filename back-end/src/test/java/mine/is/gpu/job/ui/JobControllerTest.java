package mine.is.gpu.job.ui;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import mine.is.gpu.account.domain.Member;
import mine.is.gpu.account.domain.MemberType;
import mine.is.gpu.account.domain.repository.MemberRepository;
import mine.is.gpu.account.exception.MemberException;
import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.gpuserver.domain.repository.GpuBoardRepository;
import mine.is.gpu.gpuserver.domain.repository.GpuServerRepository;
import mine.is.gpu.gpuserver.exception.GpuServerException;
import mine.is.gpu.infra.MailService;
import mine.is.gpu.job.domain.Job;
import mine.is.gpu.job.domain.repository.JobRepository;
import mine.is.gpu.job.dto.response.JobResponse;
import mine.is.gpu.job.dto.response.JobResponses;
import mine.is.gpu.job.fixture.JobFixtures;
import mine.is.gpu.lab.domain.Lab;
import mine.is.gpu.lab.domain.repository.LabRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@SpringBootTest
public class JobControllerTest {
    private final Lab lab = new Lab("lab");
    private final GpuServer serverInLab = new GpuServer("serverInLab", false, 600L, 1024L, lab);
    private final GpuBoard boardInLab = new GpuBoard(true, 800L, "aaa", serverInLab);
    private final Member userInLab = new Member("user@email.com", "password", "name", MemberType.USER, lab);
    private final Member managerInLab = new Member("manager@email.com", "password", "name", MemberType.MANAGER, lab);
    @Autowired
    private JobController jobController;
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private GpuServerRepository gpuServerRepository;
    @Autowired
    private GpuBoardRepository gpuBoardRepository;
    @Autowired
    private LabRepository labRepository;
    @Autowired
    private MemberRepository memberRepository;
    @MockBean
    private MailService mailService;

    @BeforeEach
    private void setUp() {
        labRepository.save(lab);
        gpuServerRepository.save(serverInLab);
        gpuBoardRepository.save(boardInLab);

        memberRepository.save(userInLab);
        memberRepository.save(managerInLab);

        Mockito.doNothing().when(mailService).sendJobMail(any(), any(), any());
        Mockito.doNothing().when(mailService).sendJobMail(any(), any(), any());
    }

    @AfterEach
    void tearDown() {
        jobRepository.deleteAllInBatch();
        gpuBoardRepository.deleteAllInBatch();
        gpuServerRepository.deleteAllInBatch();
        memberRepository.deleteAllInBatch();
        labRepository.deleteAllInBatch();
    }

    @Nested
    @DisplayName("Job??? ?????? ????????????.")
    class CancelJob {

        @DisplayName("????????? Job ????????? ????????????.")
        @Test
        void cancelJob() {
            Job job = new Job("jobInLab", boardInLab, userInLab, "data", "10");
            jobRepository.save(job);
            int beforeSize = numberOfWaitingJobs();

            jobController.cancel(job.getId(), userInLab);
            int afterSize = numberOfWaitingJobs();
            assertThat(beforeSize - 1).isEqualTo(afterSize);

            Mockito.verify(mailService).sendJobMail(any(), any(), any());
        }

        @DisplayName("???????????? ?????? ?????? ?????? ???????????? ????????? Job??? ?????? ????????? ??? ??????.")
        @Test
        void managerCancelJob() {
            Job jobFromOther = new Job("jobFromOther", boardInLab, userInLab, "data", "10");
            jobRepository.save(jobFromOther);
            int beforeSize = numberOfWaitingJobs();

            jobController.cancel(jobFromOther.getId(), managerInLab);
            int afterSize = numberOfWaitingJobs();
            assertThat(beforeSize - 1).isEqualTo(afterSize);

            Mockito.verify(mailService).sendJobMail(any(), any(), any());
        }

        @DisplayName("?????? ???????????? ?????? ?????? ?????? ???????????? Job ????????? ????????? ??? ??????.")
        @Test
        void userCancelJobWithoutPermission() {
            Member otherInLab = new Member("OtherInLab@email.com", "password", "name", MemberType.USER, lab);
            Job jobFromOther = new Job("jobFromOther", boardInLab, otherInLab, "data", "10");
            memberRepository.save(otherInLab);
            jobRepository.save(jobFromOther);

            assertThatThrownBy(() -> jobController.cancel(jobFromOther.getId(), userInLab))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
        }

        private int numberOfWaitingJobs() {
            ResponseEntity<JobResponses> beforeReponses = jobController
                    .findAll(lab.getId(), serverInLab.getId(), "WAITING", null);
            return beforeReponses.getBody().getJobResponses().size();
        }
    }

    @Nested
    @DisplayName("????????? ?????? lab??? ?????? ????????? ????????????. (member???, server???, lab???)")
    class FindJobs {
        private Member otherInLab = new Member("OtherInLab@email.com", "password", "name", MemberType.USER, lab);
        private GpuServer otherServerInLab = new GpuServer("otherServerInLab", false, 6L, 2L, lab);
        private GpuBoard otherBoardInLab = new GpuBoard(true, 8L, "aaa", otherServerInLab);

        private Lab otherLab = new Lab("otherLab");
        private GpuServer serverInOtherLab = new GpuServer("serverInOtherLab", false, 6L, 2L, otherLab);
        private GpuBoard boardInOtherLab = new GpuBoard(true, 8L, "aaa", serverInOtherLab);
        private Member userInOtherLab = new Member("userInOtherLab@email.com", "password", "name", MemberType.USER,
                otherLab);

        @BeforeEach
        void setUp() {
            labRepository.save(otherLab);
            gpuServerRepository.save(serverInOtherLab);
            gpuBoardRepository.save(boardInOtherLab);
            memberRepository.save(userInOtherLab);

            memberRepository.save(otherInLab);
            gpuServerRepository.save(otherServerInLab);
            gpuBoardRepository.save(otherBoardInLab);
        }

        @DisplayName("Job Id??? Job??? ????????????.")
        @Test
        void findById() {
            Job job = new Job("jobInLab", boardInLab, userInLab, "data", "10");
            jobRepository.save(job);

            ResponseEntity<JobResponse> response = jobController.findById(job.getId(), userInLab);
            assertThat(response.getBody().getId()).isEqualTo(job.getId());
        }

        @DisplayName("???????????? ???????????? Job??? ????????????.")
        @Test
        void findJobsByMember() {
            Job myJob = new Job("myJob1", boardInLab, userInLab, "data", "10");
            Job jobFromOtherInLab = new Job("jobInLab", boardInLab, otherInLab, "data", "10");

            jobRepository.save(myJob);
            jobRepository.save(jobFromOtherInLab);

            compareSearchedAndExpected(jobController.findJobsOfMine(userInLab, null, null), myJob);
        }

        @DisplayName("lab??? ???????????? Job??? ????????????.")
        @Test
        void findJobsByLab() {
            Job jobInLab = new Job("myJob1", boardInLab, userInLab, "data", "10");
            Job jobInOtherLab = new Job("jobInOtherLab", boardInOtherLab, userInOtherLab, "data", "10");

            jobRepository.save(jobInLab);
            jobRepository.save(jobInOtherLab);

            compareSearchedAndExpected(jobController.findAll(lab.getId(), null, null, null), jobInLab);
        }

        @DisplayName("????????? ???????????? ?????? ????????? ????????? ??? ??????.")
        @Test
        void findJobsByServer() {
            Job myJob = new Job("myJob1", boardInLab, userInLab, "data", "10");
            Job jobFromOtherServer = new Job("jobFromOtherLab", otherBoardInLab, otherInLab, "data", "10");

            jobRepository.save(myJob);
            jobRepository.save(jobFromOtherServer);

            compareSearchedAndExpected(jobController.findAll(lab.getId(), serverInLab.getId(), null, null), myJob);
        }

        @DisplayName("????????? ???????????? ?????? ????????? ????????? ??? url path??? labId??? serverId??? ????????????.")
        @Test
        void findJobsByServerWithMeaninglessLabId() {
            assertThatThrownBy(() -> {
                jobController.findAll(lab.getId(), serverInOtherLab.getId(), null, null);
            }).isInstanceOf(GpuServerException.UNMATCHED_SERVER_WITH_LAB.getException().getClass());
        }

        private void compareSearchedAndExpected(ResponseEntity<JobResponses> jobResponse, Job... expected) {
            List<Long> ids = jobResponse.getBody().getJobResponses().stream()
                    .map(job -> job.getId())
                    .collect(Collectors.toList());

            List<Long> expectedIds = Arrays.stream(expected)
                    .map(job -> job.getId())
                    .collect(Collectors.toList());

            assertThat(ids).usingRecursiveComparison().isEqualTo(expectedIds);
        }
    }

    @Nested
    @DisplayName("????????? ????????? ?????? lab??? ????????? ????????? ??????. (member???, server???, lab???)")
    class FindJobsInOtherLab {

        private Lab otherLab = new Lab("otherLab");
        private GpuServer serverInOtherLab = new GpuServer("serverInOtherLab", false, 6L, 2L, otherLab);
        private GpuBoard boardInOtherLab = new GpuBoard(true, 8L, "aaa", serverInOtherLab);
        private Member userInOtherLab = new Member(
                "userInOtherLab@email.com", "password", "name", MemberType.USER, otherLab);
        private Job jobInOtherLab = new Job("jobInOtherName", boardInOtherLab, userInOtherLab, "data", "10");

        @BeforeEach
        void setUp() {
            labRepository.save(otherLab);
            gpuServerRepository.save(serverInOtherLab);
            gpuBoardRepository.save(boardInOtherLab);
            memberRepository.save(userInOtherLab);
            jobRepository.save(jobInOtherLab);
        }

        @DisplayName("???????????? ?????? ??? ?????? ?????? ????????? job??? ????????? ??? ??????.")
        @Test
        void addJobWithoutPermission() {
            assertThatThrownBy(
                    () -> jobController.save(
                            lab.getId(), userInLab, JobFixtures.jobCreationRequest(serverInOtherLab.getId())
                    )).isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
        }

        @DisplayName("???????????? ?????? ?????? Job??? ?????? ????????? ??? ??????.")
        @Test
        void managerCancelJobWithoutPermission() {
            assertThatThrownBy(() -> jobController.cancel(jobInOtherLab.getId(), managerInLab))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
        }

        @DisplayName("???????????? ?????? ?????? ????????? ????????? ??? ??????.")
        @Test
        void findByIdWithoutPermission() {
            assertThatThrownBy(() -> jobController.findById(jobInOtherLab.getId(), managerInLab))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
        }

        @DisplayName("???????????? ?????? ?????? ?????? ?????? ????????? ???????????? ?????? ????????? ????????? ??? ??????.")
        @Test
        void findJobsByServerWithoutPermission() {
            assertThatThrownBy(() -> jobController.findAll(jobInOtherLab.getId(), serverInOtherLab.getId(), null, null))
                    .isInstanceOf(GpuServerException.UNMATCHED_SERVER_WITH_LAB.getException().getClass());
        }

        @DisplayName("???????????? ?????? ?????? ?????? ?????? ?????? ????????? ????????? ??? ??????.")
        @Test
        void findLogAll() {
            assertThatThrownBy(() -> jobController.findLogAll(jobInOtherLab.getId(), managerInLab))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
        }
    }
}
