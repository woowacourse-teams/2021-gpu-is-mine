package gpu.is.mine.member.application;

import gpu.is.mine.encryption.Encrypt;
import gpu.is.mine.gpuserver.domain.GpuServer;
import gpu.is.mine.gpuserver.domain.repository.GpuServerRepository;
import gpu.is.mine.gpuserver.exception.GpuServerException;
import gpu.is.mine.job.domain.Job;
import gpu.is.mine.job.domain.repository.JobRepository;
import gpu.is.mine.job.exception.JobException;
import gpu.is.mine.lab.domain.Lab;
import gpu.is.mine.lab.domain.repository.LabRepository;
import gpu.is.mine.lab.exception.LabException;
import gpu.is.mine.member.domain.Member;
import gpu.is.mine.member.domain.MemberType;
import gpu.is.mine.member.domain.repository.MemberRepository;
import gpu.is.mine.member.dto.request.MemberInfoRequest;
import gpu.is.mine.member.dto.request.MemberRequest;
import gpu.is.mine.member.dto.response.MemberResponse;
import gpu.is.mine.member.exception.MemberException;
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
        Lab lab = findLabById(request.getLabId());
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

    @Transactional(readOnly = true)
    public void checkMemberOfLab(Long memberId, Lab lab) {
        Member member = findMemberById(memberId);
        member.checkMemberOfLab(lab);
    }

    @Transactional(readOnly = true)
    public void checkMemberOfLab(Long memberId, Long labId) {
        checkMemberOfLab(memberId, findLabById(labId));
    }

    @Transactional(readOnly = true)
    public void checkManagerOfLab(Long memberId, Lab lab) {
        Member member = findMemberById(memberId);
        member.checkManagerOfLab(lab);
    }

    @Transactional(readOnly = true)
    public void checkManagerOfLab(Long memberId, Long labId) {
        checkManagerOfLab(memberId, findLabById(labId));
    }

    @Transactional(readOnly = true)
    public void checkMemberOfServer(Long memberId, Long gpuServerId) {
        GpuServer gpuServer = findGpuServerById(gpuServerId);
        checkMemberOfLab(memberId, gpuServer.getLab());
    }

    @Transactional(readOnly = true)
    public void checkManagerOfServer(Long memberId, Long gpuServerId) {
        GpuServer gpuServer = findGpuServerById(gpuServerId);
        checkManagerOfLab(memberId, gpuServer.getLab());
    }

    private Job findJobById(Long jobId) {
        return jobRepository
                .findById(jobId).orElseThrow(JobException.JOB_NOT_FOUND::getException);
    }

    private Member findMemberById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(MemberException.MEMBER_NOT_FOUND::getException);
    }

    private Lab findLabById(Long labId) {
        return labRepository.findById(labId)
                .orElseThrow(LabException.LAB_NOT_FOUND::getException);
    }

    public List<Member> findAllByLabId(Long labId) {
        return memberRepository.findAllByLabId(labId);
    }

    private GpuServer findGpuServerById(Long gpuServerId) {
        return gpuServerRepository.findById(gpuServerId)
                .orElseThrow(GpuServerException.GPU_SERVER_NOT_FOUND::getException);
    }
}
