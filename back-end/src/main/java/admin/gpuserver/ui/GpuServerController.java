package admin.gpuserver.ui;

import admin.auth.domain.AuthenticationPrincipal;
import admin.gpuserver.application.GpuServerService;
import admin.gpuserver.dto.request.GpuServerRequest;
import admin.gpuserver.dto.request.GpuServerUpdateRequest;
import admin.gpuserver.dto.response.GpuServerResponse;
import admin.gpuserver.dto.response.GpuServerResponses;
import admin.gpuserver.dto.response.GpuServerStatusResponse;
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

    public GpuServerController(GpuServerService gpuServerService) {
        this.gpuServerService = gpuServerService;
    }

    @GetMapping("/{gpuServerId}")
    public ResponseEntity<GpuServerResponse> findById(@PathVariable Long labId, @PathVariable Long gpuServerId) {
        GpuServerResponse gpuServerResponse = gpuServerService.findById(labId, gpuServerId);
        return ResponseEntity.ok(gpuServerResponse);
    }

    @GetMapping
    public ResponseEntity<GpuServerResponses> findAll(@PathVariable Long labId) {
        GpuServerResponses gpuServerResponses = gpuServerService.findAll(labId);
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
        Long gpuServerId = gpuServerService.save(member.getId(), labId, gpuServerRequest);

        URI uri = URI.create("/api/labs/" + labId + "/gpus/" + gpuServerId);
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{gpuServerId}")
    public ResponseEntity<Void> update(@PathVariable Long gpuServerId, @AuthenticationPrincipal Member member,
            @RequestBody GpuServerUpdateRequest gpuServerUpdateRequest) {
        gpuServerService.update(member.getId(), gpuServerId, gpuServerUpdateRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{gpuServerId}")
    public ResponseEntity<Void> delete(@PathVariable Long gpuServerId, @AuthenticationPrincipal Member member) {
        gpuServerService.delete(member.getId(), gpuServerId);
        return ResponseEntity.noContent().build();
    }
}
