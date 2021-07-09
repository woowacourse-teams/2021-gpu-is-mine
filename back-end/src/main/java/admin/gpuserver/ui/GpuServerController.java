package admin.gpuserver.ui;

import admin.gpuserver.application.GpuServerService;
import admin.gpuserver.dto.request.GpuServerNameUpdateRequest;
import admin.gpuserver.dto.request.GpuServerRequest;
import admin.gpuserver.dto.response.GpuServerResponse;
import admin.gpuserver.dto.response.GpuServerResponses;
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
@RequestMapping("/api")
public class GpuServerController {

    private final GpuServerService gpuServerService;

    public GpuServerController(GpuServerService gpuServerService) {
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
