package admin.gpu;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api")
public class GpuController {
    private final GpuService gpuService;

    public GpuController(GpuService gpuService) {
        this.gpuService = gpuService;
    }

    @PostMapping("/labs/{labId}/gpus")
    public ResponseEntity<Void> register(@RequestBody GpuRequest gpuRequest, @PathVariable Long labId) {
        int createdId = gpuService.register(gpuRequest);
        URI uri = URI.create("/labs/" + labId + "/gpus/" + createdId);
        return ResponseEntity.created(uri)
                .build();
    }

    @GetMapping("/labs/{labId}/gpus/{gpuId}")
    public GpuResponse detail(@PathVariable Long labId, @PathVariable Long gpuId) {
        return gpuService.detail(labId, gpuId);
    }

    @GetMapping("/labs/{labId}/gpus")
    public GpuResponses gpuList(@PathVariable Long labId) {
        return gpuService.gpuList(labId);
    }

    @PutMapping("/labs/{labId}/gpus/{gpuId}")
    public ResponseEntity<Void> delete(@RequestBody GpuRequest gpuRequest, @PathVariable Long labId, @PathVariable Long gpuId) {
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
