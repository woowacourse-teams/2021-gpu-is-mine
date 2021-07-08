package admin.gpu.ui;

import admin.gpu.application.GpuServerResponses;
import admin.gpu.application.GpuService;
import admin.gpu.dto.GpuRequest;
import admin.gpu.dto.GpuServerResponse;
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
public class GpuController {
    private final GpuService gpuService;

    public GpuController(GpuService gpuService) {
        this.gpuService = gpuService;
    }

    @PostMapping("/labs/{labId}/gpus")
    public ResponseEntity<Void> saveGpuServer(@RequestBody GpuRequest gpuRequest, @PathVariable Long labId) {
        Long gpuServerId = gpuService.saveGpuServer(gpuRequest, labId);

        URI uri = URI.create("/labs/" + labId + "/gpus/" + gpuServerId);
        return ResponseEntity.created(uri)
                .build();
    }


    @GetMapping("/labs/{labId}/gpus/{gpuServerId}")
    public GpuServerResponse findGpuServer(@PathVariable Long labId, @PathVariable Long gpuServerId) {
        return gpuService.findGpuServer(labId, gpuServerId);
    }

    //todo: 이하로
    @GetMapping("/labs/{labId}/gpus")
    public GpuServerResponses findAllGpuServer(@PathVariable Long labId) {
        return gpuService.findAllGpuServer(labId);
    }

    @PutMapping("/labs/{labId}/gpus/{gpuId}")
    public ResponseEntity<Void> modify(@RequestBody GpuRequest gpuRequest, @PathVariable Long labId, @PathVariable Long gpuId) {
        gpuService.modify(gpuRequest, labId, gpuId);
        return ResponseEntity.noContent()
                .build();
    }

    @DeleteMapping("/labs/{labId}/gpus/{gpuId}")
    public ResponseEntity<Void> delete(@PathVariable Long labId, @PathVariable Long gpuId) {
        gpuService.delete(labId, gpuId);
        return ResponseEntity.noContent()
                .build();
    }
}
