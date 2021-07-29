package admin.member.application;

import admin.gpuserver.application.GpuServerService;
import admin.job.application.JobService;
import admin.lab.application.LabService;
import admin.lab.dto.LabRequest;
import admin.lab.exception.LabException;
import admin.member.domain.MemberType;
import admin.member.dto.request.ChangeLabRequest;
import admin.member.dto.request.MemberInfoRequest;
import admin.member.dto.request.MemberRequest;
import admin.member.dto.request.MemberTypeRequest;
import admin.member.dto.response.MemberResponse;
import admin.member.exception.MemberException;
import org.assertj.core.api.AbstractThrowableAssert;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static admin.gpuserver.fixture.GpuServerFixtures.gpuServerCreationRequest;
import static admin.job.fixture.JobFixtures.jobCreationRequest;
import static admin.member.fixture.MemberFixtures.managerCreationRequest;
import static admin.member.fixture.MemberFixtures.userCreationRequest;
import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class MemberServiceTest {

    @Autowired
    private MemberService memberService;
    @Autowired
    private LabService labService;
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
        gpuServerId = gpuServerService.save(gpuServerCreationRequest(), labId);
        memberRequest = new MemberRequest("email@email.com", "password", "name", "MANAGER", labId);
    }

    @Test
    @DisplayName("정상 생성")
    void create() {
        Long createdId = memberService.save(memberRequest);

        assertThat(createdId).isNotNull();
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

        MemberInfoRequest updateRequest = new MemberInfoRequest("update@update.com", "newPassword", "newName");
        memberService.updateMemberInfo(createdId, updateRequest);

        MemberResponse response = memberService.findById(createdId);
        assertThat(response.getEmail()).isEqualTo(updateRequest.getEmail());
        assertThat(response.getName()).isEqualTo(updateRequest.getName());
    }

    @Test
    @DisplayName("UPDATE - 존재하지 멤버, 개인정보 수정시 에러 발생")
    void updateNotExistingMemberInfo() {
        Long notExistingMemberId = Long.MAX_VALUE;
        MemberInfoRequest updateRequest = new MemberInfoRequest("update@update.com", "newPassword", "newName");

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
    @DisplayName("사용자의 Job 접근 권한을 확인한다.")
    class CheckPermissionOnJob {
        private Long user;
        private Long otherUser;

        private Long jobByUser;
        private Long jobByOtherUser;

        @BeforeEach
        void setUp() {
            user = memberService.save(userCreationRequest(labId));
            otherUser = memberService.save(userCreationRequest(labId));

            jobByUser = jobService.save(user, jobCreationRequest(gpuServerId));
            jobByOtherUser = jobService.save(otherUser, jobCreationRequest(gpuServerId));
        }

        @Test
        @DisplayName("일반 사용자(User)는 본인의 작업에만 수정 권한을 갖는다.")
        void checkEditableJobByUser() {
            memberService.checkEditableJob(user, jobByUser);

            assertThatThrownBy(() -> {
                memberService.checkEditableJob(user, jobByOtherUser);
            }).isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
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
