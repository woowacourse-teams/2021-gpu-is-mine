package admin.member.ui;

import admin.auth.domain.AuthenticationPrincipal;
import admin.member.application.MemberService;
import admin.member.domain.Member;
import admin.member.dto.request.ChangeLabRequest;
import admin.member.dto.request.MemberInfoRequest;
import admin.member.dto.request.MemberRequest;
import admin.member.dto.request.MemberTypeRequest;
import admin.member.dto.response.MemberResponse;
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
    public ResponseEntity<Void> createMember(@RequestBody MemberRequest request) {
        Long createdId = memberService.createMember(request);
        URI uri = URI.create("/api/members/" + createdId);
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/me")
    public ResponseEntity<MemberResponse> findMemberOfMine(@AuthenticationPrincipal Member member) {
        MemberResponse memberResponse = memberService.findMember(member.getId());
        return ResponseEntity.ok(memberResponse);
    }

    @PutMapping("/me")
    public ResponseEntity<Void> updateMemberInfoOfMine(@AuthenticationPrincipal Member member,
            @RequestBody MemberInfoRequest request) {
        memberService.updateMemberInfo(member.getId(), request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteMemberOfMine(@AuthenticationPrincipal Member member) {
        memberService.deleteMember(member.getId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemberResponse> findMember(@PathVariable Long id) {
        MemberResponse memberResponse = memberService.findMember(id);
        return ResponseEntity.ok(memberResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateMemberInfo(@PathVariable Long id, @RequestBody MemberInfoRequest request) {
        memberService.updateMemberInfo(id, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        memberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }
}
