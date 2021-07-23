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
import admin.job.dto.response.JobResponses;
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

import javax.persistence.EntityManager;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
    private GpuServer server1;
    private GpuServer server2;
    private GpuBoard board1;
    private GpuBoard board2;
    private Lab lab;
    private Member member1;
    private Member member2;
    private Job waitingJob;
    private Job runningJob;

    @BeforeEach
    void setUp() {
        lab = new Lab("lab");
        labRepository.save(lab);

        server1 = new GpuServer("server", true, 1024L, 1024L, lab);
        gpuServerRepository.save(server1);

        server2 = new GpuServer("server2", true, 1024L, 1024L, lab);
        gpuServerRepository.save(server2);

        board1 = new GpuBoard(false, 600L, "nvdia", server1);
        gpuBoardRepository.save(board1);

        board2 = new GpuBoard(false, 600L, "nvdia", server2);
        gpuBoardRepository.save(board2);

        member1 = new Member("email1", "1234", "name1", MemberType.MANAGER, lab);
        member2 = new Member("email2", "1234", "name2", MemberType.MANAGER, lab);
        memberRepository.save(member1);
        memberRepository.save(member2);

        waitingJob = new Job("job1", JobStatus.WAITING, board1, member1);
        jobRepository.save(waitingJob);

        runningJob = new Job("job2", JobStatus.RUNNING, board1, member1);
        jobRepository.save(runningJob);
    }

    @Test
    @DisplayName("정상 등록")
    void insert() {
        JobRequest jobRequest = new JobRequest(server1.getId(), "job", "metadata", "12");
        Long id = jobService.insert(member1.getId(), jobRequest);
        assertThat(id).isNotNull();
    }

    @Autowired
    EntityManager em;

    @Test
    @DisplayName("Job 예약 시, 기본 상태는 WAITING 이다.")
    void insertWaiting() {
        JobRequest jobRequest = new JobRequest(server1.getId(), "job", "metadata", "12");
        Long id = jobService.insert(member1.getId(), jobRequest);
        assertThat(id).isNotNull();

        em.flush();
        em.clear();

        JobResponse response = jobService.findById(id);
        assertThat(response.getStatus()).isEqualTo(JobStatus.WAITING);
    }

    @Test
    @DisplayName("Job 예약을 취소한다.")
    void cancelJob(){
        Member jobOwner = runningJob.getMember();
        jobService.cancel(jobOwner.getId(), runningJob.getId());

        em.flush();
        em.clear();

        assertThat(runningJob.getStatus()).isEqualTo(JobStatus.CANCELED);
    }

    @Test
    @DisplayName("주인이 아니라면 Job 예약을 취소할 수 없다.")
    void cancelJobByNotOwner(){
        Member jobOwner = runningJob.getMember();
        Member notOwner = member2;
        assertThat(notOwner).isNotEqualTo(jobOwner);

        assertThatThrownBy(() -> {
            jobService.cancel(notOwner.getId(), runningJob.getId());
        }).isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
    }

    @Test
    @DisplayName("존재하지 않는 멤버 id로 job 등록 시 에러 발생")
    void insertNotExistingMember() {
        Long notExistingMemberId = Long.MAX_VALUE;
        JobRequest jobRequest = new JobRequest(server1.getId(), "job", "metadata", "12");

        assertThatThrownBy(() -> jobService.insert(notExistingMemberId, jobRequest))
                .isEqualTo(MemberException.MEMBER_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("존재하지 않는 서버 id로 job 등록 시 에러 발생")
    void insertNotExistingServer() {
        Long notExistingServerId = Long.MAX_VALUE;
        JobRequest jobRequest = new JobRequest(notExistingServerId, "job", "metadata", "12");
        assertThatThrownBy(() -> jobService.insert(member1.getId(), jobRequest))
                .isEqualTo(GpuBoardException.GPU_BOARD_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("삭제된 서버 id로 job 등록 시 에러 발생")
    void insertWithDeletedServer() {
        server1.setDeleted(true);
        JobRequest jobRequest = new JobRequest(server1.getId(), "job", "metadata", "12");
        assertThatThrownBy(() -> jobService.insert(member1.getId(), jobRequest))
                .isEqualTo(GpuBoardException.GPU_BOARD_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("정상 조회")
    void findById() {
        JobResponse jobResponse = jobService.findById(runningJob.getId());
        assertThat(jobResponse).isNotNull();
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
        Long jobId1 = jobService.insert(member1.getId(), new JobRequest(server1.getId(), "job1", "metadata", "12"));
        Long jobId2 = jobService.insert(member1.getId(), new JobRequest(server1.getId(), "job2", "metadata", "12"));
        Long jobId3 = jobService.insert(member1.getId(), new JobRequest(server2.getId(), "job3", "metadata", "12"));

        JobResponses byMember = jobService.findByMember(member1.getId());
        List<Long> ids = byMember.getJobResponses()
                .stream()
                .map(JobResponse::getId)
                .collect(Collectors.toList());;

        assertThat(ids).usingRecursiveComparison().isEqualTo(Arrays.asList(jobId1,jobId2,jobId3));
        assertThat(ids).hasSize(3);
    }

    @Test
    @DisplayName("서버를 기준으로 포함된 Job을 조회한다.")
    void findAllByServer() {
        Long jobId1 = jobService.insert(member1.getId(), new JobRequest(server1.getId(), "job1", "metadata", "12"));
        Long jobId2 = jobService.insert(member1.getId(), new JobRequest(server1.getId(), "job2", "metadata", "12"));
        Long jobId3 = jobService.insert(member1.getId(), new JobRequest(server2.getId(), "job3", "metadata", "12"));

        JobResponses byServer = jobService.findByServer(server1.getId());
        List<Long> ids = byServer.getJobResponses()
                .stream()
                .map(JobResponse::getId)
                .collect(Collectors.toList());;

        assertThat(ids).usingRecursiveComparison().isEqualTo(Arrays.asList(jobId1,jobId2));
        assertThat(ids).hasSize(2);
    }
}
