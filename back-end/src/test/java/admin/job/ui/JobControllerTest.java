package admin.job.ui;

import static admin.job.fixture.JobFixtures.jobCreationRequest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import admin.gpuserver.domain.repository.GpuBoardRepository;
import admin.gpuserver.domain.repository.GpuServerRepository;
import admin.gpuserver.exception.GpuServerException;
import admin.job.domain.Job;
import admin.job.domain.repository.JobRepository;
import admin.job.dto.response.JobResponse;
import admin.job.dto.response.JobResponses;
import admin.lab.domain.Lab;
import admin.lab.domain.repository.LabRepository;
import admin.mail.MailDto;
import admin.mail.MailService;
import admin.member.domain.Member;
import admin.member.domain.MemberType;
import admin.member.domain.repository.MemberRepository;
import admin.member.exception.MemberException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
public class JobControllerTest {

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

    private Lab lab = new Lab("lab");
    private GpuServer serverInLab = new GpuServer("serverInLab", false, 600L, 1024L, lab);
    private GpuBoard boardInLab = new GpuBoard(true, 800L, "aaa", serverInLab);
    private Member userInLab = new Member("user@email.com", "password", "name", MemberType.USER, lab);
    private Member managerInLab = new Member("manager@email.com", "password", "name", MemberType.MANAGER, lab);

    @BeforeEach
    private void setUp() {
        labRepository.save(lab);
        gpuServerRepository.save(serverInLab);
        gpuBoardRepository.save(boardInLab);

        memberRepository.save(userInLab);
        memberRepository.save(managerInLab);

        Mockito.doNothing().when(mailService).sendJobCancelMail(Mockito.any());
        Mockito.doNothing().when(mailService).sendJobReserveMail(Mockito.any());
    }

    @Nested
    @DisplayName("Job을 예약 취소한다.")
    class CancelJob {

        @DisplayName("본인의 Job 예약을 취소한다.")
        @Test
        void cancelJob() {
            Job job = new Job("jobInLab", boardInLab, userInLab);
            jobRepository.save(job);
            int beforeSize = numberOfWaitingJobs();

            jobController.cancel(job.getId(), userInLab);
            int afterSize = numberOfWaitingJobs();
            assertThat(beforeSize - 1).isEqualTo(afterSize);
        }

        @DisplayName("관리자는 같은 랩의 다른 사용자가 작성한 Job을 예약 취소할 수 있다.")
        @Test
        void managerCancelJob() {
            Job jobFromOther = new Job("jobFromOther", boardInLab, userInLab);
            jobRepository.save(jobFromOther);
            int beforeSize = numberOfWaitingJobs();

            jobController.cancel(jobFromOther.getId(), managerInLab);
            int afterSize = numberOfWaitingJobs();
            assertThat(beforeSize - 1).isEqualTo(afterSize);
        }

        @DisplayName("일반 사용자는 같은 랩의 다른 사용자의 Job 예약을 취소할 수 없다.")
        @Test
        void userCancelJobWithoutPermission() {
            Member otherInLab = new Member("OtherInLab@email.com", "password", "name", MemberType.USER, lab);
            Job jobFromOther = new Job("jobFromOther", boardInLab, otherInLab);
            jobRepository.save(jobFromOther);

            assertThatThrownBy(() -> jobController.cancel(jobFromOther.getId(), userInLab))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
        }

        private int numberOfWaitingJobs() {
            ResponseEntity<JobResponses> beforeReponses = jobController
                    .findAll(lab.getId(), serverInLab.getId(), "WAITING");
            return beforeReponses.getBody().getJobResponses().size();
        }
    }

    @Nested
    @DisplayName("자신이 속한 lab의 작업 목록을 확인한다. (member별, server별, lab별)")
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

        @DisplayName("Job Id로 Job을 조회한다.")
        @Test
        void findById() {
            Job job = new Job("jobInLab", boardInLab, userInLab);
            jobRepository.save(job);

            ResponseEntity<JobResponse> response = jobController.findById(job.getId(), userInLab);
            assertThat(response.getBody().getId()).isEqualTo(job.getId());
        }

        @DisplayName("사용자를 기준으로 Job을 조회한다.")
        @Test
        void findJobsByMember() {
            Job myJob = new Job("myJob1", boardInLab, userInLab);
            Job jobFromOtherInLab = new Job("jobInLab", boardInLab, otherInLab);

            jobRepository.save(myJob);
            jobRepository.save(jobFromOtherInLab);

            compareSearchedAndExpected(jobController.findJobsOfMine(userInLab, null), myJob);
        }

        @DisplayName("lab를 기준으로 Job을 조회한다.")
        @Test
        void findJobsByLab() {
            Job jobInLab = new Job("myJob1", boardInLab, userInLab);
            Job jobInOtherLab = new Job("jobInOtherLab", boardInOtherLab, userInOtherLab);

            jobRepository.save(jobInLab);
            jobRepository.save(jobInOtherLab);

            compareSearchedAndExpected(jobController.findAll(lab.getId(), null, null), jobInLab);
        }

        @DisplayName("서버를 기준으로 작업 목록을 확인할 수 있다.")
        @Test
        void findJobsByServer() {
            Job myJob = new Job("myJob1", boardInLab, userInLab);
            Job jobFromOtherServer = new Job("jobFromOtherLab", otherBoardInLab, otherInLab);

            jobRepository.save(myJob);
            jobRepository.save(jobFromOtherServer);

            compareSearchedAndExpected(jobController.findAll(lab.getId(), serverInLab.getId(), null), myJob);
        }

        @DisplayName("서버를 기준으로 작업 목록을 조회할 때 url path의 labId와 serverId를 검증한다.")
        @Test
        void findJobsByServerWithMeaninglessLabId() {
            assertThatThrownBy(() -> {
                jobController.findAll(lab.getId(), serverInOtherLab.getId(), null);
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
    @DisplayName("자신이 속하지 않은 lab의 작업에 권한이 없다. (member별, server별, lab별)")
    class FindJobsInOtherLab {

        private Lab otherLab = new Lab("otherLab");
        private GpuServer serverInOtherLab = new GpuServer("serverInOtherLab", false, 6L, 2L, otherLab);
        private GpuBoard boardInOtherLab = new GpuBoard(true, 8L, "aaa", serverInOtherLab);
        private Member userInOtherLab = new Member("user@email.com", "password", "name", MemberType.USER, otherLab);
        private Job jobInOtherLab = new Job("jobInOtherName", boardInOtherLab, userInOtherLab);

        @BeforeEach
        void setUp() {
            labRepository.save(otherLab);
            gpuServerRepository.save(serverInOtherLab);
            gpuBoardRepository.save(boardInOtherLab);
            memberRepository.save(userInOtherLab);
            jobRepository.save(jobInOtherLab);
        }

        @DisplayName("소속되지 않은 랩 또는 외부 서버에 job을 예약할 수 없다.")
        @Test
        void addJobWithoutPermission() {
            assertThatThrownBy(
                    () -> jobController.save(lab.getId(), userInLab, jobCreationRequest(serverInOtherLab.getId())))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
        }

        @DisplayName("소속되지 않은 랩의 Job을 예약 취소할 수 없다.")
        @Test
        void managerCancelJobWithoutPermission() {
            assertThatThrownBy(() -> jobController.cancel(jobInOtherLab.getId(), managerInLab))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
        }

        @DisplayName("사용자는 다른 랩의 작업을 조회할 수 없다.")
        @Test
        void findByIdWithoutPermission() {
            assertThatThrownBy(() -> jobController.findById(jobInOtherLab.getId(), managerInLab))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
        }

        @DisplayName("사용자의 랩이 아닌 다른 랩의 서버를 기준으로 작업 목록을 확인할 수 없다.")
        @Test
        void findJobsByServerWithoutPermission() {
            assertThatThrownBy(() -> jobController.findAll(jobInOtherLab.getId(), serverInOtherLab.getId(), null))
                    .isInstanceOf(GpuServerException.UNMATCHED_SERVER_WITH_LAB.getException().getClass());
        }
    }
}
