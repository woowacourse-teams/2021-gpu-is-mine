package admin.gpuserver.ui;

import admin.gpuserver.application.GpuServerService;
import admin.gpuserver.dto.request.GpuServerRequest;
import admin.gpuserver.dto.request.GpuServerUpdateRequest;
import admin.exception.dto.ExceptionResponse;
import admin.gpuserver.dto.response.GpuServerResponse;
import admin.gpuserver.dto.response.GpuServerResponses;
import admin.gpuserver.exception.GpuServerException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/labs/{labId}/gpus")
public class GpuServerController {

    private final GpuServerService gpuServerService;

    public GpuServerController(GpuServerService gpuServerService) {
        this.gpuServerService = gpuServerService;
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody GpuServerRequest gpuServerRequest, @PathVariable Long labId) {
        Long gpuServerId = gpuServerService.saveGpuServer(gpuServerRequest, labId);

        URI uri = URI.create("/api/labs/" + labId + "/gpus/" + gpuServerId);
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/{gpuServerId}")
    public ResponseEntity<GpuServerResponse> findById(@PathVariable Long gpuServerId) {
        GpuServerResponse gpuServerResponse = gpuServerService.findById(gpuServerId);
        return ResponseEntity.ok(gpuServerResponse);
    }

    @GetMapping
    public ResponseEntity<GpuServerResponses> findAll(@PathVariable Long labId) {
        GpuServerResponses gpuServerResponses = gpuServerService.findAll(labId);
        return ResponseEntity.ok(gpuServerResponses);
    }

    @PutMapping("/{gpuServerId}")
    public ResponseEntity<Void> update(
            @RequestBody GpuServerUpdateRequest gpuServerUpdateRequest,
            @PathVariable Long gpuServerId) {
        gpuServerService.updateGpuServer(gpuServerUpdateRequest, gpuServerId);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{gpuServerId}")
    public ResponseEntity<Void> delete(@PathVariable Long gpuServerId) {
        gpuServerService.delete(gpuServerId);

        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(GpuServerException.class)
    public ResponseEntity<ExceptionResponse> handleException(GpuServerException e) {
        ExceptionResponse exceptionResponse = ExceptionResponse.of(e.getMessage());

        return ResponseEntity.badRequest().body(exceptionResponse);
    }
}
