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
import java.util.List;
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
    public Long save(MemberRequest request) {
        Lab lab = labRepository.findById(request.getLabId())
                .orElseThrow(LabException.LAB_NOT_FOUND::getException);
        MemberType memberType = MemberType.ignoreCaseValueOf(request.getMemberType());

        Member member = new Member(request.getEmail(), request.getPassword(), request.getName(), memberType, lab);
        memberRepository.save(member);

        return member.getId();
    }

    @Transactional(readOnly = true)
    public MemberResponse findById(Long memberId) {
        Member member = findMemberById(memberId);
        return MemberResponse.of(member);
    }

    @Transactional
    public void updateMemberInfo(Long memberId, MemberInfoRequest request) {
        Member member = findMemberById(memberId);

        member.setEmail(request.getEmail());
        member.setPassword(request.getPassword());
        member.setName(request.getName());
    }

    @Transactional
    public void delete(Long memberId) {
        Member member = findMemberById(memberId);
        memberRepository.delete(member);
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
        return memberRepository.findById(id)
                .orElseThrow(MemberException.MEMBER_NOT_FOUND::getException);
    }

    private GpuServer findAliveServerById(Long gpuServerId) {
        return gpuServerRepository.findById(gpuServerId)
                .orElseThrow(GpuServerException.GPU_SERVER_NOT_FOUND::getException);
    }

    private Lab findLabById(Long labId) {
        return labRepository.findById(labId)
                .orElseThrow(LabException.LAB_NOT_FOUND::getException);
    }

    public List<Member> findAllByLabId(Long labId) {
        return memberRepository.findAllByLabId(labId);
    }
}
