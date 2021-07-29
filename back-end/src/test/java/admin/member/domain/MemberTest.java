package admin.member.domain;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import admin.job.domain.Job;
import admin.lab.domain.Lab;
import admin.member.exception.MemberException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class MemberTest {
    private Lab lab1;
    private Lab lab2;

    private GpuServer serverInLab1;
    private GpuServer serverInLab2;

    private GpuBoard boardInLab1;
    private GpuBoard boardInLab2;

    @BeforeEach
    void setUP() {
        lab1 = new Lab(0L, "lab1");
        lab2 = new Lab(1L, "lab2");

        serverInLab1 = new GpuServer("server1", 1L, 1L, lab1);
        serverInLab2 = new GpuServer("server2", 1L, 1L, lab2);

        boardInLab1 = new GpuBoard(1L, "name", serverInLab1);
        boardInLab2 = new GpuBoard(1L, "name", serverInLab2);
    }

    @DisplayName("사용자가 Job 열람 권한이 있는지 확인한다.")
    @Test
    void checkReadable() {
        Member user1 = new Member(0L, "email", "password", "name", MemberType.USER, lab1);
        Member user2 = new Member(1L, "email", "password", "name", MemberType.USER, lab2);

        Job jobInLab1 = new Job("job", boardInLab1, user1);
        Job jobInLab2 = new Job("job", boardInLab2, user2);

        user1.checkReadable(jobInLab1);
        assertThatThrownBy(() -> {
            user1.checkReadable(jobInLab2);
        }).isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
    }

    @DisplayName("일반 사용자가 Job 수정 권한이 있는지 확인한다.")
    @Test
    void checkEditableWithUser() {
        Member user1 = new Member(0L, "email", "password", "name", MemberType.USER, lab1);
        Member user2 = new Member(1L, "email", "password", "name", MemberType.USER, lab1);

        Job jobByUser1 = new Job("job", boardInLab1, user1);
        Job jobByUser2 = new Job("job", boardInLab1, user2);

        user1.checkEditable(jobByUser1);
        user2.checkEditable(jobByUser2);

        assertThatThrownBy(() -> {
            user1.checkEditable(jobByUser2);
        }).isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
    }

    @DisplayName("관리자가 Job 수정 권한이 있는지 확인한다.")
    @Test
    void checkEditableWithManager() {
        Member user1 = new Member(0L, "email", "password", "name", MemberType.USER, lab1);
        Member user2 = new Member(1L, "email", "password", "name", MemberType.USER, lab1);
        Member manager = new Member(2L, "email", "password", "name", MemberType.MANAGER, lab1);

        GpuBoard boardInLab1 = new GpuBoard(1L, "name", serverInLab1);

        Job jobByUser1 = new Job("job", boardInLab1, user1);
        Job jobByUser2 = new Job("job", boardInLab1, user2);

        manager.checkEditable(jobByUser1);
        manager.checkEditable(jobByUser2);
    }
}
