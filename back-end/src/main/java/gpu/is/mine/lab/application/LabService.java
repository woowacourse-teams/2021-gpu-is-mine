package gpu.is.mine.lab.application;

import gpu.is.mine.gpuserver.application.GpuServerService;
import gpu.is.mine.gpuserver.domain.GpuServer;
import gpu.is.mine.lab.domain.Lab;
import gpu.is.mine.lab.domain.repository.LabRepository;
import gpu.is.mine.lab.dto.LabRequest;
import gpu.is.mine.lab.dto.LabResponse;
import gpu.is.mine.lab.dto.LabResponses;
import gpu.is.mine.lab.exception.LabException;
import gpu.is.mine.member.application.MemberService;
import gpu.is.mine.member.domain.Member;
import java.util.List;
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
        Lab lab = new Lab(labRequest.getName());
        labRepository.save(lab);
        return lab.getId();
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
