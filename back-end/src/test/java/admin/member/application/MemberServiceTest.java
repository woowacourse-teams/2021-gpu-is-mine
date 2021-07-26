package admin.member.application;

import static admin.gpuserver.fixture.GpuServerFixtures.gpuServerCreationRequest;
import static admin.job.fixture.JobFixtures.jobCreationRequest;
import static admin.member.fixture.MemberFixtures.managerCreationRequest;
import static admin.member.fixture.MemberFixtures.userCreationRequest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.catchThrowable;

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
        gpuServerId = gpuServerService.saveGpuServer(gpuServerCreationRequest(), labId);
        memberRequest = new MemberRequest("email@email.com", "password", "name", "MANAGER", labId);
    }

    @Test
    @DisplayName("정상 생성")
    void create() {
        Long createdId = memberService.createMember(memberRequest);

        assertThat(createdId).isNotNull();
    }

    @Test
    @DisplayName("존재하는 멤버 조회")
    void findExistingMember() {
        Long createdId = memberService.createMember(memberRequest);

        MemberResponse response = memberService.findMember(createdId);

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

        assertThatThrownBy(() -> memberService.findMember(notExistingId))
                .isEqualTo(MemberException.MEMBER_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("UPDATE - 멤버 개인정보 수정")
    void updateMemberInfo() {
        Long createdId = memberService.createMember(memberRequest);

        MemberInfoRequest updateRequest = new MemberInfoRequest("update@update.com", "newPassword", "newName");
        memberService.updateMemberInfo(createdId, updateRequest);

        MemberResponse response = memberService.findMember(createdId);
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
    @DisplayName("UPDATE - MemberType 변경")
    void updateMemberType() {
        Long createdId = memberService.createMember(memberRequest);
        MemberTypeRequest memberTypeRequest = new MemberTypeRequest("USER");

        memberService.updateMemberType(createdId, memberTypeRequest);

        MemberResponse response = memberService.findMember(createdId);
        Assertions.assertThat(response.getMemberType()).isEqualTo(MemberType.USER);
    }

    @Test
    @DisplayName("UPDATE - 존재하지 멤버, 타입 수정시 에러 발생")
    void updateNotExistingMemberMemberType() {
        Long notExistingMemberId = Long.MAX_VALUE;
        MemberTypeRequest memberTypeRequest = new MemberTypeRequest("USER");

        Throwable throwable = catchThrowable(() -> memberService
                .updateMemberType(notExistingMemberId, memberTypeRequest));
        존재하지_않는_회원_요청_에러_발생(throwable);
    }

    @Test
    @DisplayName("UPDATE - 존재하지 않는 MemberType 변경 요청시 에러 발생")
    void updateNotExistingMemberType() {
        Long createdId = memberService.createMember(memberRequest);
        MemberTypeRequest notMemberType = new MemberTypeRequest("NOT_MEMBER_TYPE");

        assertThatThrownBy(() -> memberService.updateMemberType(createdId, notMemberType))
                .isEqualTo(MemberException.INVALID_MEMBER_TYPE.getException());
    }

    @Test
    @DisplayName("UPDATE - Lab 수정")
    void updateMemberExistingLab() {
        Long createdId = memberService.createMember(memberRequest);
        Long newLabId = labService.save(new LabRequest("newLab"));
        ChangeLabRequest changeLabRequest = new ChangeLabRequest(newLabId);

        memberService.changeLab(createdId, changeLabRequest);

        MemberResponse response = memberService.findMember(createdId);
        assertThat(response.getLabResponse()
                .getId()).isEqualTo(newLabId);
    }

    @Test
    @DisplayName("UPDATE - 존재하지 멤버, Lab 수정시 에러 발생")
    void updateNotExistingMemberLab() {
        Long notExistingMemberId = Long.MAX_VALUE;
        Long newLabId = labService.save(new LabRequest("newLab"));
        ChangeLabRequest changeLabRequest = new ChangeLabRequest(newLabId);

        Throwable throwable = catchThrowable(() -> memberService.changeLab(notExistingMemberId, changeLabRequest));
        존재하지_않는_회원_요청_에러_발생(throwable);
    }

    @Test
    @DisplayName("UPDATE - 존재하지 않는 Lab으로 수정시 에러 발생")
    void updateMemberNotExistingLab() {
        Long createdId = memberService.createMember(memberRequest);
        Long notExistingLabId = Long.MAX_VALUE;
        ChangeLabRequest changeLabRequest = new ChangeLabRequest(notExistingLabId);

        assertThatThrownBy(() -> memberService.changeLab(createdId, changeLabRequest))
                .isEqualTo(LabException.LAB_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("존재하는 멤버 삭제 요청")
    void deleteMember() {
        Long createdId = memberService.createMember(memberRequest);
        Assertions.assertThat(memberService.findMember(createdId)).isNotNull();

        memberService.deleteMember(createdId);

        Throwable throwable = catchThrowable(() -> memberService.findMember(createdId));
        존재하지_않는_회원_요청_에러_발생(throwable);
    }

    @Test
    @DisplayName("존재하지 않는 멤버 삭제 요청")
    void deleteNotExistingMember() {
        Long notExistingMemberId = Long.MAX_VALUE;

        Throwable throwable = catchThrowable(() -> memberService.deleteMember(notExistingMemberId));
        존재하지_않는_회원_요청_에러_발생(throwable);
    }

    private AbstractThrowableAssert<?, ? extends Throwable> 존재하지_않는_회원_요청_에러_발생(Throwable throwable) {
        return assertThat(throwable)
                .isEqualTo(MemberException.MEMBER_NOT_FOUND.getException());
    }

    @Nested
    @DisplayName("사용자는 본인 Lab, Server에만 Job 열람 권한을 갖는다.")
    class CheckPermissionOnLab {

        private Long lab;
        private Long serverInLab;
        private Long userInLab;

        @BeforeEach
        void setUp() {
            lab = labService.save(new LabRequest("labA"));
            serverInLab = gpuServerService.saveGpuServer(gpuServerCreationRequest(), lab);
            userInLab = memberService.createMember(userCreationRequest(lab));
        }

        @Test
        @DisplayName("멤버의 본인 Lab에만 Job 열람 권한을 갖는다.")
        void checkPermissionOnLab() {
            Long otherLab = labService.save(new LabRequest("labB"));
            memberService.checkPermissionOnLab(userInLab, lab);

            assertThatThrownBy(() -> {
                memberService.checkPermissionOnLab(userInLab, otherLab);
            }).isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
        }

        @Test
        @DisplayName("멤버는 본인 Lab에 속한 server에만 접근 권한을 갖는다.")
        void checkPermissionOnServer() {
            Long otherLab = labService.save(new LabRequest("labB"));
            Long serverInOtherLab = gpuServerService.saveGpuServer(gpuServerCreationRequest(), otherLab);

            memberService.checkPermissionOnServer(userInLab, serverInLab);

            assertThatThrownBy(() -> {
                memberService.checkPermissionOnServer(userInLab, serverInOtherLab);
            }).isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
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
            user = memberService.createMember(userCreationRequest(labId));
            otherUser = memberService.createMember(userCreationRequest(labId));

            jobByUser = jobService.insert(user, jobCreationRequest(gpuServerId));
            jobByOtherUser = jobService.insert(otherUser, jobCreationRequest(gpuServerId));
        }

        @Test
        @DisplayName("멤버의 본인 Lab에 속한 Job에 열람 권한을 갖는다.")
        void checkReadableJob() {
            memberService.checkReadableJob(user, jobByUser);
            memberService.checkReadableJob(user, jobByOtherUser);
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
            Long managerId = memberService.createMember(managerCreationRequest(labId));

            memberService.checkEditableJob(managerId, jobByUser);
            memberService.checkEditableJob(managerId, jobByOtherUser);
        }
    }
}
