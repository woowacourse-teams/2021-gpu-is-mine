package admin.gpuserver.ui;

import admin.auth.domain.AuthenticationPrincipal;
import admin.gpuserver.application.GpuServerService;
import admin.gpuserver.dto.request.GpuServerRequest;
import admin.gpuserver.dto.request.GpuServerUpdateRequest;
import admin.gpuserver.dto.response.GpuServerResponse;
import admin.gpuserver.dto.response.GpuServerResponses;
import admin.gpuserver.dto.response.GpuServerStatusResponse;
import admin.member.application.MemberService;
import admin.member.domain.Member;
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

    @GetMapping("/{gpuServerId}")
    public ResponseEntity<GpuServerResponse> findById(@PathVariable Long labId, @PathVariable Long gpuServerId) {
        GpuServerResponse gpuServerResponse = gpuServerService.findServerInLab(labId, gpuServerId);
        return ResponseEntity.ok(gpuServerResponse);
    }

    @GetMapping
    public ResponseEntity<GpuServerResponses> findAll(@PathVariable Long labId) {
        GpuServerResponses gpuServerResponses = gpuServerService.findAllInLab(labId);
        return ResponseEntity.ok(gpuServerResponses);
    }

    @GetMapping("/{gpuServerId}/status")
    public ResponseEntity<GpuServerStatusResponse> status(@PathVariable Long labId, @PathVariable Long gpuServerId) {
        GpuServerStatusResponse response = gpuServerService.findServerStatusInLab(labId, gpuServerId);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Void> save(@PathVariable Long labId, @AuthenticationPrincipal Member member,
            @RequestBody GpuServerRequest gpuServerRequest) {
        memberService.checkManagerOnLab(member.getId(), labId);

        Long gpuServerId = gpuServerService.saveServerInLab(labId, gpuServerRequest);
        URI uri = URI.create("/api/labs/" + labId + "/gpus/" + gpuServerId);
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{gpuServerId}")
    public ResponseEntity<Void> update(@PathVariable Long labId, @PathVariable Long gpuServerId,
            @AuthenticationPrincipal Member member,
            @RequestBody GpuServerUpdateRequest gpuServerUpdateRequest) {
        memberService.checkManagerOnLab(member.getId(), labId);

        gpuServerService.updateServerInLab(labId, gpuServerId, gpuServerUpdateRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{gpuServerId}")
    public ResponseEntity<Void> delete(@PathVariable Long labId, @PathVariable Long gpuServerId,
            @AuthenticationPrincipal Member member) {
        memberService.checkManagerOnLab(member.getId(), labId);

        gpuServerService.deleteServerInLab(labId, gpuServerId);
        return ResponseEntity.noContent().build();
    }
}
