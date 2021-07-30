package admin.member.application;

import admin.encryption.Encrypt;
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
import admin.member.dto.request.MemberInfoRequest;
import admin.member.dto.request.MemberRequest;
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
    private final Encrypt encrypt;

    public MemberService(MemberRepository memberRepository, LabRepository labRepository,
            GpuServerRepository gpuServerRepository, JobRepository jobRepository,
            Encrypt encrypt) {
        this.memberRepository = memberRepository;
        this.labRepository = labRepository;
        this.gpuServerRepository = gpuServerRepository;
        this.jobRepository = jobRepository;
        this.encrypt = encrypt;
    }

    @Transactional
    public Long save(MemberRequest request) {
        Lab lab = labRepository.findById(request.getLabId())
                .orElseThrow(LabException.LAB_NOT_FOUND::getException);
        MemberType memberType = MemberType.ignoreCaseValueOf(request.getMemberType());
        String password = encrypt.hashedPassword(request.getPassword(), request.getEmail());

        Member member = new Member(request.getEmail(), password, request.getName(), memberType, lab);
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
        String password = encrypt.hashedPassword(request.getPassword(), request.getEmail());

        member.setEmail(request.getEmail());
        member.setPassword(password);
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

    @Transactional(readOnly = true)
    public void checkReadableJob(Long memberId, Long jobId) {
        Member member = findMemberById(memberId);
        Job job = findJobById(jobId);

        member.checkReadable(job);
    }

    private Job findJobById(Long jobId) {
        return jobRepository
                .findById(jobId).orElseThrow(JobException.JOB_NOT_FOUND::getException);
    }

    private Member findMemberById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(MemberException.MEMBER_NOT_FOUND::getException);
    }

    public List<Member> findAllByLabId(Long labId) {
        return memberRepository.findAllByLabId(labId);
    }

    public void checkManagerOnLab(Long memberId, Long labId) {
        Lab lab = labRepository.findById(labId)
                .orElseThrow(LabException.LAB_NOT_FOUND::getException);

        Member member = findMemberById(memberId);
        member.checkManagerOfLab(lab);
    }
}
