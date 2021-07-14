package admin.member.application;

import admin.lab.application.LabService;
import admin.lab.dto.LabRequest;
import admin.member.domain.MemberType;
import admin.member.dto.request.ChangeLabRequest;
import admin.member.dto.request.MemberInfoRequest;
import admin.member.dto.request.MemberRequest;
import admin.member.dto.request.MemberTypeRequest;
import admin.member.dto.response.MemberResponse;
import admin.member.exception.MemberException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
class MemberServiceTest {

    @Autowired
    private MemberService memberService;
    @Autowired
    private LabService labService;

    private Long labId;
    private MemberRequest memberRequest;

    @BeforeEach
    void setUp() {
        labId = labService.save(new LabRequest("Lab"));
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
        assertThat(response.getMemberType()).isEqualTo(MemberType.ignoreCaseValueOf(memberRequest.getMemberType()));
        assertThat(response.getLabResponse()
                .getId()).isEqualTo(memberRequest.getLabId());
    }

    @Test
    @DisplayName("존재하지 않는 id 멤버 조회")
    void findNotExistingMember() {
        Long notExistingId = Long.MAX_VALUE;

        assertThatThrownBy(() -> memberService.findMember(notExistingId)).isInstanceOf(MemberException.class)
                .hasMessage("해당 id의 회원이 존재하지 않습니다.");
    }

    @Test
    @DisplayName("UPDATE - 멤버 개인정보 수정")
    void updateExistingMember() {
        Long createdId = memberService.createMember(memberRequest);

        MemberInfoRequest updateRequest = new MemberInfoRequest("update@update.com", "newPassword", "newName");
        memberService.updateMemberInfo(createdId, updateRequest);

        MemberResponse response = memberService.findMember(createdId);
        assertThat(response.getEmail()).isEqualTo(updateRequest.getEmail());
        assertThat(response.getName()).isEqualTo(updateRequest.getName());
    }

    @Test
    @DisplayName("UPDATE - MemberType 변경")
    void updateMemberType() {
        Long createdId = memberService.createMember(memberRequest);
        MemberTypeRequest memberTypeRequest = new MemberTypeRequest("USER");

        memberService.changeMemberType(createdId, memberTypeRequest);

        MemberResponse response = memberService.findMember(createdId);
        assertThat(response.getMemberType()).isEqualTo(MemberType.USER);
    }

    @Test
    @DisplayName("UPDATE - Lab 옮김")
    void updateMemberExistingLab() {
        Long createdId = memberService.createMember(memberRequest);
        Long newLabId = labService.save(new LabRequest("newLab"));
        ChangeLabRequest changeLabRequest = new ChangeLabRequest(newLabId);

        memberService.changeLab(createdId, changeLabRequest);

        MemberResponse response = memberService.findMember(createdId);
        assertThat(response.getLabResponse().getId()).isEqualTo(newLabId);
    }

}

