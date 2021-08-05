package mine.is.gpu.gpuserver.ui;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import mine.is.gpu.gpuserver.domain.GpuBoard;
import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.gpuserver.domain.repository.GpuBoardRepository;
import mine.is.gpu.gpuserver.domain.repository.GpuServerRepository;
import mine.is.gpu.gpuserver.fixture.GpuServerFixtures;
import mine.is.gpu.lab.domain.Lab;
import mine.is.gpu.lab.domain.repository.LabRepository;
import mine.is.gpu.member.domain.Member;
import mine.is.gpu.member.domain.MemberType;
import mine.is.gpu.member.domain.repository.MemberRepository;
import mine.is.gpu.member.exception.MemberException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
class GpuServerControllerTest {

    @Autowired
    private GpuServerController gpuServerController;

    @Autowired
    private GpuServerRepository gpuServerRepository;

    @Autowired
    private GpuBoardRepository gpuBoardRepository;

    @Autowired
    private LabRepository labRepository;

    @Autowired
    private MemberRepository memberRepository;

    private Lab lab = new Lab("lab1");
    private GpuServer serverInLab = new GpuServer("server1", false, 600L, 1024L, lab);
    private Member member = new Member("email@email.com", "password", "name", MemberType.USER, lab);

    @BeforeEach
    private void setUp() {
        labRepository.save(lab);
        gpuServerRepository.save(serverInLab);
        gpuBoardRepository.save(new GpuBoard(true, 800L, "aaa", serverInLab));
        memberRepository.save(member);
    }

    @DisplayName("lab에 속하지 않은 server에는 조회 권한이 없다.")
    @Test
    void searchWithOtherLabServer() {
        Lab otherLab = labRepository.save(new Lab("lab2"));
        GpuServer serverInOtherLab = new GpuServer("server2", true, 800L, 1024L, otherLab);

        gpuServerRepository.save(serverInOtherLab);
        gpuBoardRepository.save(new GpuBoard(true, 800L, "bbb", serverInOtherLab));

        assertThatThrownBy(() -> gpuServerController.findById(serverInOtherLab.getId(), member))
                .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());

        assertThatThrownBy(() -> gpuServerController.status(serverInOtherLab.getId(), member))
                .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
    }

    @Nested
    @DisplayName("관리자 권한을 확인한다.")
    class ManagerAuthorization {
        private Lab otherLab = new Lab("otherLab");
        private Member manager = new Member("manager@email.com", "password", "name", MemberType.MANAGER, lab);
        private Member user = new Member("user@email.com", "password", "name", MemberType.USER, lab);

        @BeforeEach
        private void setUp() {
            memberRepository.save(manager);
            memberRepository.save(user);
            labRepository.save(otherLab);
        }

        @DisplayName("일반 사용자 또는 외부 랩 관리자가 서버를 생성할 수 없다.")
        @Test
        void saveWithUnAuthorizedMember() {
            assertThatThrownBy(() ->
                    gpuServerController.save(lab.getId(), user, GpuServerFixtures.gpuServerCreationRequest()))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());

            assertThatThrownBy(() ->
                    gpuServerController.save(otherLab.getId(), manager, GpuServerFixtures.gpuServerCreationRequest()))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
        }

        @DisplayName("lab에 속하지 않은 server에 조회, 생성, 수정, 삭제할 수 없다.")
        @Test
        void handleWithOtherLabServer() {
            Lab otherLab = labRepository.save(new Lab("lab2"));
            GpuServer serverInOtherLab = new GpuServer("server2", true, 800L, 1024L, otherLab);

            gpuServerRepository.save(serverInOtherLab);
            gpuBoardRepository.save(new GpuBoard(true, 800L, "bbb", serverInOtherLab));

            assertThatThrownBy(() ->
                    gpuServerController.save(otherLab.getId(), manager, GpuServerFixtures.gpuServerCreationRequest()))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());

            assertThatThrownBy(() -> gpuServerController
                    .update(serverInOtherLab.getId(), manager, GpuServerFixtures.gpuServerUpdateRequest()))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());

            assertThatThrownBy(() -> gpuServerController.delete(serverInOtherLab.getId(), manager))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
        }
    }
}
