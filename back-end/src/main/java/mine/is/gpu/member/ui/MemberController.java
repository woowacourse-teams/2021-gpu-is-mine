package mine.is.gpu.member.ui;

import mine.is.gpu.auth.domain.AuthenticationPrincipal;
import mine.is.gpu.member.application.MemberService;
import mine.is.gpu.member.domain.Member;
import mine.is.gpu.member.dto.request.MemberUpdateRequest;
import mine.is.gpu.member.dto.request.MemberRequest;
import mine.is.gpu.member.dto.response.MemberResponse;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/members")
public class MemberController {
    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody MemberRequest request) {
        Long createdId = memberService.save(request);
        URI uri = URI.create("/api/members/" + createdId);
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/me")
    public ResponseEntity<MemberResponse> findMemberOfMine(@AuthenticationPrincipal Member member) {
        MemberResponse memberResponse = memberService.findById(member.getId());
        return ResponseEntity.ok(memberResponse);
    }

    @PutMapping("/me")
    public ResponseEntity<Void> updateMemberInfoOfMine(@AuthenticationPrincipal Member member,
            @RequestBody MemberUpdateRequest request) {
        memberService.updateMemberInfo(member.getId(), request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteMemberOfMine(@AuthenticationPrincipal Member member) {
        memberService.delete(member.getId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemberResponse> findMemberById(@PathVariable Long id) {
        MemberResponse memberResponse = memberService.findById(id);
        return ResponseEntity.ok(memberResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateMemberInfo(@PathVariable Long id, @RequestBody MemberUpdateRequest request) {
        memberService.updateMemberInfo(id, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        memberService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
