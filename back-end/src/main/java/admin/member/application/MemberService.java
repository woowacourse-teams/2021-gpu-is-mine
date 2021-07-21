package admin.member.application;

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

    public MemberService(MemberRepository memberRepository, LabRepository labRepository) {
        this.memberRepository = memberRepository;
        this.labRepository = labRepository;
    }

    @Transactional
    public Long createMember(MemberRequest request) {
        Lab lab = labRepository.findById(request.getLabId())
                .orElseThrow(LabException.LAB_NOT_FOUND::getException);
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

        Lab updateLab = labRepository.findById(changeLabRequest.getLabId())
                .orElseThrow(LabException.LAB_NOT_FOUND::getException);
        member.setLab(updateLab);
    }

    @Transactional
    public void deleteMember(Long id) {
        Member member = findMemberById(id);
        memberRepository.delete(member);
    }

    private Member findMemberById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(MemberException.MEMBER_NOT_FOUND::getException);
    }
}
