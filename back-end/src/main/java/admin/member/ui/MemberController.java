package admin.member.ui;

import admin.gpuserver.dto.response.ExceptionResponse;
import admin.member.application.MemberService;
import admin.member.dto.request.ChangeLabRequest;
import admin.member.dto.request.MemberInfoRequest;
import admin.member.dto.request.MemberRequest;
import admin.member.dto.request.MemberTypeRequest;
import admin.member.dto.response.MemberResponse;
import admin.member.exception.MemberException;
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
        Long createdId = memberService.createMember(request);
        URI uri = URI.create("/api/members/" + createdId);
        return ResponseEntity.created(uri).build();
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

    @PutMapping("/{id}/memberType")
    public ResponseEntity<Void> updateMemberType(@PathVariable Long id, @RequestBody MemberTypeRequest request) {
        memberService.updateMemberType(id, request);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/lab")
    public ResponseEntity<Void> updateMemberLab(@PathVariable Long id, @RequestBody ChangeLabRequest request) {
        memberService.changeLab(id, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        memberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(MemberException.class)
    public ResponseEntity<ExceptionResponse> handleException(MemberException exception) {
        ExceptionResponse exceptionResponse = ExceptionResponse.of(exception);
        return ResponseEntity.badRequest().body(exceptionResponse);
    }
}
