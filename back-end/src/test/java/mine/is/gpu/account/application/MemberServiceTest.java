package mine.is.gpu.account.application;

import static mine.is.gpu.account.fixture.MemberFixtures.managerCreationRequest;
import static mine.is.gpu.account.fixture.MemberFixtures.userCreationRequest;
import static mine.is.gpu.job.fixture.JobFixtures.jobCreationRequest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.catchThrowable;

import mine.is.gpu.account.domain.MemberType;
import mine.is.gpu.account.dto.request.MemberRequest;
import mine.is.gpu.account.dto.request.MemberUpdateRequest;
import mine.is.gpu.account.dto.response.MemberResponse;
import mine.is.gpu.account.exception.MemberException;
import mine.is.gpu.gpuserver.application.GpuServerService;
import mine.is.gpu.gpuserver.fixture.GpuServerFixtures;
import mine.is.gpu.job.application.JobService;
import mine.is.gpu.lab.application.LabService;
import mine.is.gpu.lab.dto.LabRequest;
import org.assertj.core.api.AbstractThrowableAssert;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@ActiveProfiles("test")
@SpringBootTest
@Transactional
class MemberServiceTest {
    @Autowired
    private LabService labService;
    @Autowired
    private MemberService memberService;
    @Autowired
    private GpuServerService gpuServerService;
    @Autowired
    private JobService jobService;

    private Long labId;
    private Long gpuServerId;
    private MemberRequest memberRequest;

    @BeforeEach
    void setUp() {
        labId = labService.save(new LabRequest("lab"));
        memberRequest = new MemberRequest("email@email.com", "password", "name", "MANAGER", labId);
        gpuServerId = gpuServerService.saveServerInLab(labId, GpuServerFixtures.gpuServerCreationRequest());
    }

    @Test
    @DisplayName("정상 생성")
    void create() {
        Long createdId = memberService.save(memberRequest);

        assertThat(createdId).isNotNull();
    }

    @Test
    @DisplayName("중복 이메일 생성")
    void duplicateEmailCreate() {
        memberService.save(memberRequest);

        MemberRequest memberRequestSameEmail = new MemberRequest(
                memberRequest.getEmail(), "password2", "name2", "USER", 2L);
        assertThatThrownBy(() -> memberService.save(memberRequestSameEmail))
                .isEqualTo(MemberException.DUPLICATE_EMAIL_EXCEPTION.getException());
    }

    @Test
    @DisplayName("존재하는 멤버 조회")
    void findExistingMember() {
        Long createdId = memberService.save(memberRequest);

        MemberResponse response = memberService.findById(createdId);

        assertThat(response.getId()).isEqualTo(createdId);
        assertThat(response.getEmail()).isEqualTo(memberRequest.getEmail());
        assertThat(response.getName()).isEqualTo(memberRequest.getName());
        Assertions.assertThat(response.getMemberType())
                .isEqualTo(MemberType.ignoreCaseValueOf(memberRequest.getMemberType()));
        assertThat(response.getLabResponse()
                .getId()).isEqualTo(memberRequest.getLabId());
    }

    @Test
    @DisplayName("존재하지 않는 id 멤버 조회")
    void findNotExistingMember() {
        Long notExistingId = Long.MAX_VALUE;

        assertThatThrownBy(() -> memberService.findById(notExistingId))
                .isEqualTo(MemberException.MEMBER_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("UPDATE - 멤버 개인정보 수정")
    void updateMemberInfo() {
        Long createdId = memberService.save(memberRequest);

        MemberUpdateRequest updateRequest = new MemberUpdateRequest("newName", "newPassword");
        memberService.updateMemberInfo(createdId, updateRequest);

        MemberResponse response = memberService.findById(createdId);
        assertThat(response.getName()).isEqualTo(updateRequest.getName());
    }

    @Test
    @DisplayName("UPDATE - 존재하지 멤버, 개인정보 수정시 에러 발생")
    void updateNotExistingMemberInfo() {
        Long notExistingMemberId = Long.MAX_VALUE;
        MemberUpdateRequest updateRequest = new MemberUpdateRequest("newName", "newPassword");

        Throwable throwable = catchThrowable(() -> memberService.updateMemberInfo(notExistingMemberId, updateRequest));
        존재하지_않는_회원_요청_에러_발생(throwable);
    }

    @Test
    @DisplayName("존재하는 멤버 삭제 요청")
    void deleteMember() {
        Long createdId = memberService.save(memberRequest);
        Assertions.assertThat(memberService.findById(createdId)).isNotNull();

        memberService.delete(createdId);

        Throwable throwable = catchThrowable(() -> memberService.findById(createdId));
        존재하지_않는_회원_요청_에러_발생(throwable);
    }

    @Test
    @DisplayName("존재하지 않는 멤버 삭제 요청")
    void deleteNotExistingMember() {
        Long notExistingMemberId = Long.MAX_VALUE;

        Throwable throwable = catchThrowable(() -> memberService.delete(notExistingMemberId));
        존재하지_않는_회원_요청_에러_발생(throwable);
    }

    private AbstractThrowableAssert<?, ? extends Throwable> 존재하지_않는_회원_요청_에러_발생(Throwable throwable) {
        return assertThat(throwable)
                .isEqualTo(MemberException.MEMBER_NOT_FOUND.getException());
    }

    @Nested
    @DisplayName("사용자의 Lab 접근 권한을 확인한다.")
    class CheckPermissionOnLab {

        private Long user;
        private Long manager;
        private Long otherLabId;

        @BeforeEach
        void setUp() {
            user = memberService.save(userCreationRequest(labId));
            manager = memberService.save(managerCreationRequest(labId));
            otherLabId = labService.save(new LabRequest("otherLab"));
        }

        @DisplayName("사용자가 Lab에 매니저인지 확인한다.")
        @Test
        void validateManager() {
            memberService.checkManagerOfLab(manager, labId);
        }

        @DisplayName("사용자가 Lab에 일반 유저인 경우 예외를 발생한다.")
        @Test
        void validateManagerWithUser() {
            assertThatThrownBy(() -> memberService.checkManagerOfLab(user, labId))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
        }

        @DisplayName("사용자가 해당 랩의 멤버가 아닌 경우 예외를 발생한다.")
        @Test
        void validateManagerWithOtherLab() {
            assertThatThrownBy(() -> memberService.checkManagerOfLab(manager, otherLabId))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());

            assertThatThrownBy(() -> memberService.checkManagerOfLab(user, otherLabId))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
        }
    }

    @Nested
    @DisplayName("사용자의 Job 접근 권한을 확인한다.")
    class CheckPermissionOnJob {
        private Long user;
        private Long otherUser;

        private Long jobByUser;
        private Long jobByOtherUser;

        @BeforeEach
        void setUp() {
            user = memberService.save(userCreationRequest(labId));
            otherUser = memberService.save(userCreationRequest(labId, "user@email.com", "12345"));

            jobByUser = jobService.save(user, jobCreationRequest(gpuServerId));
            jobByOtherUser = jobService.save(otherUser, jobCreationRequest(gpuServerId));
        }

        @Test
        @DisplayName("일반 사용자(User)는 본인의 작업에만 수정 권한을 갖는다.")
        void checkEditableJobByUser() {
            memberService.checkEditableJob(user, jobByUser);

            assertThatThrownBy(() -> memberService.checkEditableJob(user, jobByOtherUser))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
        }

        @Test
        @DisplayName("관리 사용자(Manager)는 랩의 모든 작업에 수정 권한을 갖는다.")
        void checkEditableJobByManager() {
            Long managerId = memberService.save(managerCreationRequest(labId));

            memberService.checkEditableJob(managerId, jobByUser);
            memberService.checkEditableJob(managerId, jobByOtherUser);
        }
    }
}
