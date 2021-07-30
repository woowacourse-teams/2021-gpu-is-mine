package admin.gpuserver.ui;

import static admin.gpuserver.fixture.GpuServerFixtures.gpuServerCreationRequest;
import static admin.gpuserver.fixture.GpuServerFixtures.gpuServerUpdateRequest;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import admin.gpuserver.domain.GpuBoard;
import admin.gpuserver.domain.GpuServer;
import admin.gpuserver.domain.repository.GpuBoardRepository;
import admin.gpuserver.domain.repository.GpuServerRepository;
import admin.gpuserver.exception.GpuServerException;
import admin.lab.domain.Lab;
import admin.lab.domain.repository.LabRepository;
import admin.member.domain.Member;
import admin.member.domain.MemberType;
import admin.member.domain.repository.MemberRepository;
import admin.member.exception.MemberException;
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

    @BeforeEach
    private void setUp() {
        labRepository.save(lab);
        gpuServerRepository.save(serverInLab);
        gpuBoardRepository.save(new GpuBoard(true, 800L, "aaa", serverInLab));
    }

    @DisplayName("lab에 속하는 server로 조회할 수 있다.")
    @Test
    void findServerInLab() {
        gpuServerController.findById(lab.getId(), serverInLab.getId());
    }

    @DisplayName("lab에 속하는 server 목록을 검색할 수 있다.")
    @Test
    void findAll() {
        gpuServerController.findAll(lab.getId());
    }

    @DisplayName("lab에 속하는 server로 상태를 조회할 수 있다.")
    @Test
    void status() {
        gpuServerController.status(lab.getId(), serverInLab.getId());
    }

    @DisplayName("lab에 속하지 않은 server에는 조회 권한이 없다.")
    @Test
    void searchWithOtherLabServer() {
        Lab otherLab = labRepository.save(new Lab("lab2"));
        GpuServer serverInOtherLab = new GpuServer("server1", true, 800L, 1024L, otherLab);

        gpuServerRepository.save(serverInOtherLab);
        gpuBoardRepository.save(new GpuBoard(true, 800L, "bbb", serverInOtherLab));

        assertThatThrownBy(() -> gpuServerController.findById(lab.getId(), serverInOtherLab.getId()))
                .isInstanceOf(GpuServerException.GPU_SERVER_NOT_FOUND.getException().getClass());

        assertThatThrownBy(() -> gpuServerController.status(lab.getId(), serverInOtherLab.getId()))
                .isInstanceOf(GpuServerException.GPU_SERVER_NOT_FOUND.getException().getClass());
    }

    @DisplayName("관리자 권한을 확인한다.")
    @Nested
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

        @DisplayName("랩 관리자는 본인 랩의 서버를 생성, 수정, 삭제 할 수 있다.")
        @Test
        void createUpdateAndDelete() {
            gpuServerController.save(lab.getId(), manager, gpuServerCreationRequest());
            gpuServerController.update(lab.getId(), serverInLab.getId(), manager, gpuServerUpdateRequest());
            gpuServerController.delete(lab.getId(), serverInLab.getId(), manager);
        }

        @DisplayName("일반 사용자 또는 외부 랩 관리자가 서버를 생성할 수 없다.")
        @Test
        void saveWithUnAuthorizedMember() {
            assertThatThrownBy(() -> gpuServerController.save(lab.getId(), user, gpuServerCreationRequest()))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());

            assertThatThrownBy(() -> gpuServerController.save(otherLab.getId(), manager, gpuServerCreationRequest()))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());
        }

        @DisplayName("lab에 속하지 않은 server에 조회, 생성, 수정, 삭제할 수 없다.")
        @Test
        void handleWithOtherLabServer() {
            Lab otherLab = labRepository.save(new Lab("lab2"));
            GpuServer serverInOtherLab = new GpuServer("server1", true, 800L, 1024L, otherLab);

            gpuServerRepository.save(serverInOtherLab);
            gpuBoardRepository.save(new GpuBoard(true, 800L, "bbb", serverInOtherLab));

            assertThatThrownBy(() -> gpuServerController.save(otherLab.getId(), manager, gpuServerCreationRequest()))
                    .isInstanceOf(MemberException.UNAUTHORIZED_MEMBER.getException().getClass());

            assertThatThrownBy(() -> gpuServerController
                    .update(lab.getId(), serverInOtherLab.getId(), manager, gpuServerUpdateRequest()))
                    .isInstanceOf(GpuServerException.GPU_SERVER_NOT_FOUND.getException().getClass());

            assertThatThrownBy(() -> gpuServerController.delete(lab.getId(), serverInOtherLab.getId(), manager))
                    .isInstanceOf(GpuServerException.GPU_SERVER_NOT_FOUND.getException().getClass());
        }
    }
}
