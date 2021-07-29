package admin.gpuserver.ui;

import admin.gpuserver.application.GpuServerService;
import admin.gpuserver.dto.request.GpuServerRequest;
import admin.gpuserver.dto.request.GpuServerUpdateRequest;
import admin.gpuserver.dto.response.GpuServerResponse;
import admin.gpuserver.dto.response.GpuServerResponses;
import admin.gpuserver.dto.response.GpuServerStatusResponse;
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

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody GpuServerRequest gpuServerRequest, @PathVariable Long labId) {
        Long gpuServerId = gpuServerService.save(gpuServerRequest, labId);

        URI uri = URI.create("/api/labs/" + labId + "/gpus/" + gpuServerId);
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/{gpuServerId}")
    public ResponseEntity<GpuServerResponse> findById(@PathVariable Long labId, @PathVariable Long gpuServerId) {
        GpuServerResponse gpuServerResponse = gpuServerService.findServerInLab(labId, gpuServerId);
        return ResponseEntity.ok(gpuServerResponse);
    }

    @GetMapping
    public ResponseEntity<GpuServerResponses> findAll(@PathVariable Long labId) {
        GpuServerResponses gpuServerResponses = gpuServerService.findAll(labId);
        return ResponseEntity.ok(gpuServerResponses);
    }

    @PutMapping("/{gpuServerId}")
    public ResponseEntity<Void> update(
            @PathVariable Long labId,
            @PathVariable Long gpuServerId,
            @RequestBody GpuServerUpdateRequest gpuServerUpdateRequest) {
        gpuServerService.updateServerInLab(labId, gpuServerId, gpuServerUpdateRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{gpuServerId}")
    public ResponseEntity<Void> delete(@PathVariable Long labId, @PathVariable Long gpuServerId) {
        gpuServerService.deleteServerInLab(labId, gpuServerId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{gpuServerId}/status")
    public ResponseEntity<GpuServerStatusResponse> status(@PathVariable Long labId, @PathVariable Long gpuServerId) {
        GpuServerStatusResponse response = gpuServerService.findServerStatusInLab(labId, gpuServerId);
        return ResponseEntity.ok(response);
    }
}
