package admin.member.application;

import admin.lab.domain.Lab;
import admin.lab.domain.repository.LabRepository;
import admin.member.domain.Member;
import admin.member.domain.MemberType;
import admin.member.domain.repository.MemberRepository;
import admin.member.dto.MemberRequest;
import admin.member.dto.MemberResponse;
import admin.member.exception.MemberException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;

@Service
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;
    private final LabRepository labRepository;

    public MemberService(MemberRepository memberRepository, LabRepository labRepository) {
        this.memberRepository = memberRepository;
        this.labRepository = labRepository;
    }

    public Long createMember(MemberRequest request) {
        Lab lab = labRepository.findById(request.getLabId()).orElseThrow(() -> new MemberException("해당 lab은 존재하지 않습니다."));
        MemberType memberType = MemberType.ignoreCaseValueOf(request.getMemberType());

        Member member = new Member(request.getEmail(), request.getPassword(), request.getName(), memberType, lab);
        memberRepository.save(member);

        return member.getId();
    }

    public MemberResponse findMember(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new MemberException("해당 id의 회원이 존재하지 않습니다."));
        return MemberResponse.of(member);
    }

    public void updateMember(Long id, MemberRequest request) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new MemberException("해당 id의 회원이 존재하지 않습니다."));
        member.setEmail(request.getEmail());
        member.setPassword(request.getPassword());
        member.setName(request.getName());
        member.setMemberType(MemberType.valueOf(request.getMemberType().toUpperCase()));

        Lab updateLab = labRepository.findById(request.getLabId()).orElseThrow(() -> new MemberException("해당 lab은 존재하지 않습니다."));
        member.setLab(updateLab);

        memberRepository.save(member);
    }

    public void deleteMember(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(() -> new MemberException("해당 id의 회원이 존재하지 않습니다."));
        memberRepository.delete(member);
    }
}
