package mine.is.gpu.lab.application;

import java.util.List;
import mine.is.gpu.gpuserver.application.GpuServerService;
import mine.is.gpu.gpuserver.domain.GpuServer;
import mine.is.gpu.lab.domain.Lab;
import mine.is.gpu.lab.domain.repository.LabRepository;
import mine.is.gpu.lab.dto.LabRequest;
import mine.is.gpu.lab.dto.LabResponse;
import mine.is.gpu.lab.dto.LabResponses;
import mine.is.gpu.lab.exception.LabException;
import mine.is.gpu.member.application.MemberService;
import mine.is.gpu.member.domain.Member;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LabService {
    private final LabRepository labRepository;
    private final GpuServerService gpuServerService;
    private final MemberService memberService;

    public LabService(LabRepository labRepository, GpuServerService gpuServerService, MemberService memberService) {
        this.labRepository = labRepository;
        this.gpuServerService = gpuServerService;
        this.memberService = memberService;
    }

    @Transactional
    public Long save(LabRequest labRequest) {
        checkDuplicate(labRequest.getName());
        Lab lab = new Lab(labRequest.getName());
        labRepository.save(lab);
        return lab.getId();
    }

    private void checkDuplicate(String name) {
        if (labRepository.existsByName(name)) {
            throw LabException.DUPLICATE_LAB_NAME.getException();
        }
    }

    @Transactional(readOnly = true)
    public LabResponse findById(Long labId) {
        Lab lab = findLabById(labId);
        return LabResponse.of(lab);
    }

    @Transactional(readOnly = true)
    public LabResponses findAll() {
        List<Lab> labs = labRepository.findAll();
        return LabResponses.of(labs);
    }

    @Transactional
    public void update(Long labId, LabRequest labRequest) {
        Lab lab = findLabById(labId);
        lab.setName(labRequest.getName());
    }

    @Transactional
    public void delete(Long labId) {
        Lab lab = findLabById(labId);
        List<GpuServer> gpuServers = gpuServerService.findAllByLabId(lab.getId());

        for (GpuServer gpuServer : gpuServers) {
            gpuServerService.deleteById(gpuServer.getId());
        }

        List<Member> members = memberService.findAllByLabId(lab.getId());
        for (Member member : members) {
            memberService.delete(member.getId());
        }
        labRepository.delete(lab);
    }

    private Lab findLabById(Long labId) {
        return labRepository.findById(labId)
                .orElseThrow(LabException.LAB_NOT_FOUND::getException);
    }
}
