package gpu.is.mine.lab.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import gpu.is.mine.exception.http.NotFoundException;
import gpu.is.mine.gpuserver.domain.GpuBoard;
import gpu.is.mine.gpuserver.domain.GpuServer;
import gpu.is.mine.gpuserver.domain.repository.GpuBoardRepository;
import gpu.is.mine.gpuserver.domain.repository.GpuServerRepository;
import gpu.is.mine.job.domain.Job;
import gpu.is.mine.job.domain.JobStatus;
import gpu.is.mine.job.domain.repository.JobRepository;
import gpu.is.mine.lab.domain.Lab;
import gpu.is.mine.lab.domain.repository.LabRepository;
import gpu.is.mine.lab.dto.LabRequest;
import gpu.is.mine.lab.dto.LabResponse;
import gpu.is.mine.lab.dto.LabResponses;
import gpu.is.mine.lab.exception.LabException;
import gpu.is.mine.member.domain.Member;
import gpu.is.mine.member.domain.MemberType;
import gpu.is.mine.member.domain.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class LabServiceTest {
    private static final LabRequest LAB_REQUEST = new LabRequest("labName");

    @Autowired
    private LabService labService;

    @Autowired
    private GpuServerRepository gpuServerRepository;

    @Autowired
    private GpuBoardRepository gpuBoardRepository;

    @Autowired
    private LabRepository labRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private JobRepository jobRepository;

    @Test
    @DisplayName("정상 생성")
    void save() {
        Long createdId = labService.save(LAB_REQUEST);

        assertThat(createdId).isNotNull();
    }

    @Test
    @DisplayName("생성한 id 조회")
    void findById() {
        Long createdId = labService.save(LAB_REQUEST);

        LabResponse labResponse = labService.findById(createdId);

        assertThat(labResponse.getId()).isEqualTo(createdId);
        assertThat(labResponse.getName()).isEqualTo(LAB_REQUEST.getName());
    }

    @Test
    @DisplayName("존재하지 않는 id 조회시 에러 발생")
    void findByNotExistingId() {
        Long notExistingId = Long.MAX_VALUE;

        assertThatThrownBy(() -> labService.findById(notExistingId))
                .isEqualTo(LabException.LAB_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("전체 조회")
    void findAll() {
        LabResponses labResponses = labService.findAll();

        assertThat(labResponses).isNotNull();
    }

    @Test
    @DisplayName("생성 후 전체 조회")
    void createAndFindAll() {
        LabResponses beforeLabResponses = labService.findAll();
        int beforeSize = beforeLabResponses.getLabResponses().size();

        labService.save(LAB_REQUEST);

        LabResponses afterLabResponses = labService.findAll();
        int afterSize = afterLabResponses.getLabResponses().size();
        assertThat(afterSize).isEqualTo(beforeSize + 1);
    }

    @Test
    @DisplayName("정상 수정")
    void update() {
        Long createdId = labService.save(LAB_REQUEST);
        LabRequest labRequestToUpdate = new LabRequest("updateLabName");

        labService.update(createdId, labRequestToUpdate);

        LabResponse labResponse = labService.findById(createdId);
        assertThat(labResponse.getName()).isEqualTo(labRequestToUpdate.getName());
    }

    @Test
    @DisplayName("존재하지 않는 id 수정시 에러 발생")
    void updateWithNotExistingId() {
        Long notExistingId = Long.MAX_VALUE;
        LabRequest labRequestToUpdate = new LabRequest("updateLabName");

        assertThatThrownBy(() -> labService.update(notExistingId, labRequestToUpdate))
                .isEqualTo(LabException.LAB_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("정상 삭제 후 조회시 에러 발생")
    void delete() {
        Long createdId = labService.save(LAB_REQUEST);
        Assertions.assertThat(labService.findById(createdId)).isNotNull();

        labService.delete(createdId);

        assertThatThrownBy(() -> labService.findById(createdId))
                .isEqualTo(LabException.LAB_NOT_FOUND.getException());
    }

    @Test
    @DisplayName("존재하지 않는 id 삭제시 에러 발생")
    void deleteWithNotExistingId() {
        Long notExistingId = Long.MAX_VALUE;

        assertThatThrownBy(() -> labService.delete(notExistingId))
                .isEqualTo(LabException.LAB_NOT_FOUND.getException());
    }

    @DisplayName("lab 이 삭제되면 관련된 모든 gpuServer, gpuBoard, jobs, member 가 삭제된다.")
    @Test
    void deleteLab() {
        // given
        Lab lab = labRepository.save(new Lab("랩1"));
        GpuServer gpuServer = gpuServerRepository
                .save(new GpuServer("GPU서버1", false, 600L, 1024L, lab));
        GpuBoard gpuBoard = gpuBoardRepository
                .save(new GpuBoard(true, 800L, "aaa", gpuServer));
        Member member = memberRepository
                .save(new Member("email@email.com", "password", "name", MemberType.MANAGER, lab));
        jobRepository.save(new Job("예약1", JobStatus.RUNNING, gpuBoard, member, "metaData1", "10"));
        jobRepository.save(new Job("예약2", JobStatus.WAITING, gpuBoard, member, "metaData2", "10"));
        jobRepository.save(new Job("예약3", JobStatus.WAITING, gpuBoard, member, "metaData3", "10"));
        jobRepository.save(new Job("예약4", JobStatus.WAITING, gpuBoard, member, "metaData4", "10"));
        final Long labId = lab.getId();
        final Long gpuServerId = gpuServer.getId();
        final Long gpuBoardId = gpuBoard.getId();
        final Long memberId = member.getId();

        // when
        labService.delete(labId);

        // then
        assertThatThrownBy(() -> labService.findById(labId)).isInstanceOf(NotFoundException.class);
        assertThat(gpuServerRepository.findAllByLabId(labId)).hasSize(0);
        assertThat(gpuBoardRepository.findById(gpuBoardId).isPresent()).isFalse();
        assertThat(gpuBoardRepository.findByGpuServerId(gpuServerId).isPresent()).isFalse();
        Assertions.assertThat(jobRepository.findAllByGpuBoardId(gpuBoardId)).hasSize(0);
        assertThat(memberRepository.findById(memberId).isPresent()).isFalse();
    }
}
