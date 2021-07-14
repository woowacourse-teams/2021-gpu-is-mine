package admin.member.ui;

import admin.member.application.MemberService;
import admin.member.dto.request.MemberInfoRequest;
import admin.member.dto.request.MemberRequest;
import admin.member.dto.response.MemberResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/members")
public class MemberController {
    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity<Void> createMember(@RequestBody MemberRequest request) {
        Long createdId =  memberService.createMember(request);
        return ResponseEntity.created(URI.create("/api/members/" + createdId)).build();
    }

    @GetMapping("{id}")
    public ResponseEntity<MemberResponse> findMember(@PathVariable Long id) {
        MemberResponse memberResponse = memberService.findMember(id);
        return ResponseEntity.ok(memberResponse);
    }

    @PutMapping("{id}")
    public ResponseEntity<Void> updateMember(@PathVariable Long id, @RequestBody MemberInfoRequest request) {
        memberService.updateMemberInfo(id, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        memberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }
}
