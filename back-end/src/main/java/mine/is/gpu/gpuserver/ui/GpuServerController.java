package mine.is.gpu.gpuserver.ui;

import mine.is.gpu.auth.domain.AuthenticationPrincipal;
import mine.is.gpu.gpuserver.application.GpuServerService;
import mine.is.gpu.gpuserver.dto.request.GpuServerRequest;
import mine.is.gpu.gpuserver.dto.request.GpuServerUpdateRequest;
import mine.is.gpu.gpuserver.dto.response.GpuServerResponse;
import mine.is.gpu.gpuserver.dto.response.GpuServerResponses;
import mine.is.gpu.gpuserver.dto.response.GpuServerStatusResponse;
import mine.is.gpu.member.application.MemberService;
import mine.is.gpu.member.domain.Member;
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
@RequestMapping("/api/labs/{labId}/gpus")
public class GpuServerController {

    private final GpuServerService gpuServerService;
    private final MemberService memberService;

    public GpuServerController(GpuServerService gpuServerService, MemberService memberService) {
        this.gpuServerService = gpuServerService;
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity<Void> save(@PathVariable Long labId, @AuthenticationPrincipal Member member,
            @RequestBody GpuServerRequest gpuServerRequest) {
        memberService.checkManagerOfLab(member.getId(), labId);

        Long gpuServerId = gpuServerService.saveServerInLab(labId, gpuServerRequest);
        URI uri = URI.create("/api/labs/" + labId + "/gpus/" + gpuServerId);
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/{gpuServerId}")
    public ResponseEntity<GpuServerResponse> findById(@PathVariable Long gpuServerId,
            @AuthenticationPrincipal Member member) {
        memberService.checkMemberOfServer(member.getId(), gpuServerId);

        GpuServerResponse gpuServerResponse = gpuServerService.findById(gpuServerId);
        return ResponseEntity.ok(gpuServerResponse);
    }

    @GetMapping
    public ResponseEntity<GpuServerResponses> findAllInLab(@PathVariable Long labId,
            @AuthenticationPrincipal Member member) {
        memberService.checkMemberOfLab(member.getId(), labId);

        GpuServerResponses gpuServerResponses = gpuServerService.findAllInLab(labId);
        return ResponseEntity.ok(gpuServerResponses);
    }

    @PutMapping("/{gpuServerId}")
    public ResponseEntity<Void> update(@PathVariable Long gpuServerId, @AuthenticationPrincipal Member member,
            @RequestBody GpuServerUpdateRequest gpuServerUpdateRequest) {
        memberService.checkManagerOfServer(member.getId(), gpuServerId);

        gpuServerService.updateById(gpuServerId, gpuServerUpdateRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{gpuServerId}")
    public ResponseEntity<Void> delete(@PathVariable Long gpuServerId, @AuthenticationPrincipal Member member) {
        memberService.checkManagerOfServer(member.getId(), gpuServerId);

        gpuServerService.deleteById(gpuServerId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{gpuServerId}/status")
    public ResponseEntity<GpuServerStatusResponse> status(@PathVariable Long gpuServerId,
            @AuthenticationPrincipal Member member) {
        memberService.checkMemberOfServer(member.getId(), gpuServerId);

        GpuServerStatusResponse response = gpuServerService.findStatusById(gpuServerId);
        return ResponseEntity.ok(response);
    }
}