package admin.lab.application;

import admin.gpuserver.application.GpuServerService;
import admin.gpuserver.domain.GpuServer;
import admin.lab.domain.Lab;
import admin.lab.domain.repository.LabRepository;
import admin.lab.dto.LabRequest;
import admin.lab.dto.LabResponse;
import admin.lab.dto.LabResponses;
import admin.lab.exception.LabException;
import admin.member.application.MemberService;
import admin.member.domain.Member;
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
            gpuServerService.delete(gpuServer.getId());
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
