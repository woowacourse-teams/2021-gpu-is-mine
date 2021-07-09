package admin.gpu.ui;

import admin.gpu.application.GpuServerService;
import admin.gpu.dto.GpuServerNameUpdateRequest;
import admin.gpu.dto.GpuServerRequest;
import admin.gpu.dto.GpuServerResponse;
import admin.gpu.dto.GpuServerResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api")
public class GpuController {

    private final GpuServerService gpuServerService;

    public GpuController(GpuServerService gpuServerService) {
        this.gpuServerService = gpuServerService;
    }

    @PostMapping("/labs/{labId}/gpus")
    public ResponseEntity<Void> saveGpuServer(@RequestBody GpuServerRequest gpuServerRequest,
                                              @PathVariable Long labId) {
        Long gpuServerId = gpuServerService.saveGpuServer(gpuServerRequest, labId);

        URI uri = URI.create("/labs/" + labId + "/gpus/" + gpuServerId);
        return ResponseEntity.created(uri)
                .build();
    }


    @GetMapping("/labs/{labId}/gpus/{gpuServerId}")
    public GpuServerResponse findGpuServer(@PathVariable Long labId,
                                           @PathVariable Long gpuServerId) {
        return gpuServerService.findGpuServer(labId, gpuServerId);
    }

    @GetMapping("/labs/{labId}/gpus")
    public GpuServerResponses findAllGpuServer(@PathVariable Long labId) {
        return gpuServerService.findAllGpuServer(labId);
    }


    @PutMapping("/labs/{labId}/gpus/{gpuId}")
    public ResponseEntity<Void> modify(
            @RequestBody GpuServerNameUpdateRequest gpuServerNameUpdateRequest,
            @PathVariable Long labId, @PathVariable Long gpuId) {
        gpuServerService.updateGpuServer(gpuServerNameUpdateRequest, labId, gpuId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/labs/{labId}/gpus/{gpuId}")
    public ResponseEntity<Void> delete(@PathVariable Long labId, @PathVariable Long gpuId) {
        gpuServerService.delete(labId, gpuId);
        return ResponseEntity.noContent()
                .build();
    }
}
