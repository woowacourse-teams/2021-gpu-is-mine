package admin.member.application;

import admin.gpuserver.domain.GpuServer;
import admin.gpuserver.domain.repository.GpuServerRepository;
import admin.gpuserver.exception.GpuServerException;
import admin.job.domain.Job;
import admin.job.domain.repository.JobRepository;
import admin.job.exception.JobException;
import admin.lab.domain.Lab;
import admin.lab.domain.repository.LabRepository;
import admin.lab.exception.LabException;
import admin.member.domain.Member;
import admin.member.domain.MemberType;
import admin.member.domain.repository.MemberRepository;
import admin.member.dto.request.ChangeLabRequest;
import admin.member.dto.request.MemberInfoRequest;
import admin.member.dto.request.MemberRequest;
import admin.member.dto.request.MemberTypeRequest;
import admin.member.dto.response.MemberResponse;
import admin.member.exception.MemberException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final LabRepository labRepository;
    private final GpuServerRepository gpuServerRepository;
    private final JobRepository jobRepository;

    public MemberService(MemberRepository memberRepository, LabRepository labRepository,
                         GpuServerRepository gpuServerRepository, JobRepository jobRepository) {
        this.memberRepository = memberRepository;
        this.labRepository = labRepository;
        this.gpuServerRepository = gpuServerRepository;
        this.jobRepository = jobRepository;
    }

    @Transactional
    public Long createMember(MemberRequest request) {
        Lab lab = findLabById(request.getLabId());
        MemberType memberType = MemberType.ignoreCaseValueOf(request.getMemberType());

        Member member = new Member(request.getEmail(), request.getPassword(), request.getName(), memberType, lab);
        memberRepository.save(member);

        return member.getId();
    }

    @Transactional(readOnly = true)
    public MemberResponse findMember(Long id) {
        Member member = findMemberById(id);
        return MemberResponse.of(member);
    }

    @Transactional
    public void updateMemberInfo(Long id, MemberInfoRequest request) {
        Member member = findMemberById(id);

        member.setEmail(request.getEmail());
        member.setPassword(request.getPassword());
        member.setName(request.getName());
    }

    @Transactional
    public void updateMemberType(Long id, MemberTypeRequest memberTypeRequest) {
        Member member = findMemberById(id);
        MemberType memberType = MemberType.ignoreCaseValueOf(memberTypeRequest.getMemberType());
        member.setMemberType(memberType);
    }

    @Transactional
    public void changeLab(Long id, ChangeLabRequest changeLabRequest) {
        Member member = findMemberById(id);

        Lab updateLab = findLabById(changeLabRequest.getLabId());
        member.setLab(updateLab);
    }

    @Transactional
    public void deleteMember(Long id) {
        Member member = findMemberById(id);
        memberRepository.delete(member);
    }

    @Transactional(readOnly = true)
    public void checkPermissionOnLab(Long memberId, Long labId) {
        Member member = findMemberById(memberId);
        Lab lab = findLabById(labId);

        member.checkPermissionOnLab(lab);
    }

    @Transactional(readOnly = true)
    public void checkPermissionOnServer(Long memberId, Long gpuServerId) {
        Member member = findMemberById(memberId);
        GpuServer gpuServer = findAliveServerById(gpuServerId);

        member.checkPermissionOnServer(gpuServer);
    }

    @Transactional(readOnly = true)
    public void checkReadableJob(Long memberId, Long jobId) {
        Member member = findMemberById(memberId);
        Job job = findJobById(jobId);

        member.checkReadable(job);
    }

    @Transactional(readOnly = true)
    public void checkEditableJob(Long memberId, Long jobId) {
        Member member = findMemberById(memberId);
        Job job = findJobById(jobId);

        member.checkEditable(job);
    }

    private Job findJobById(Long jobId) {
        return jobRepository
                .findById(jobId).orElseThrow(JobException.JOB_NOT_FOUND::getException);
    }

    private Member findMemberById(Long id) {
        return memberRepository
                .findById(id).orElseThrow(MemberException.MEMBER_NOT_FOUND::getException);
    }

    private GpuServer findAliveServerById(Long gpuServerId) {
        return gpuServerRepository.findByIdAndDeletedFalse(gpuServerId)
                .orElseThrow(GpuServerException.GPU_SERVER_NOT_FOUND::getException);
    }

    private Lab findLabById(Long labId) {
        return labRepository.findById(labId)
                .orElseThrow(LabException.LAB_NOT_FOUND::getException);
    }
}
