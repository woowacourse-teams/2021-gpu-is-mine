package admin.gpuserver.ui;

import admin.gpuserver.application.GpuServerService;
import admin.gpuserver.dto.request.GpuServerNameUpdateRequest;
import admin.gpuserver.dto.request.GpuServerRequest;
import admin.gpuserver.dto.response.EmptyJsonResponse;
import admin.gpuserver.dto.response.ExceptionResponse;
import admin.gpuserver.dto.response.GpuServerResponse;
import admin.gpuserver.dto.response.GpuServerResponses;
import java.net.URI;

import admin.gpuserver.exception.GpuServerServiceException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/labs/{labId}/gpus")
public class GpuServerController {

    private final GpuServerService gpuServerService;

    public GpuServerController(GpuServerService gpuServerService) {
        this.gpuServerService = gpuServerService;
    }

    @PostMapping
    public ResponseEntity<EmptyJsonResponse> saveGpuServer(@RequestBody GpuServerRequest gpuServerRequest,
                                                           @PathVariable Long labId) {
        Long gpuServerId = gpuServerService.saveGpuServer(gpuServerRequest, labId);

        URI uri = URI.create("/api/labs/" + labId + "/gpus/" + gpuServerId);
        return ResponseEntity.created(uri)
                .body(new EmptyJsonResponse());
    }


    @GetMapping("/{gpuServerId}")
    public ResponseEntity<GpuServerResponse> findGpuServer(@PathVariable Long labId,
                                           @PathVariable Long gpuServerId) {
        GpuServerResponse gpuServerResponse = gpuServerService.findGpuServer(labId, gpuServerId);

        return ResponseEntity.ok()
                .body(gpuServerResponse);
    }

    @GetMapping
    public ResponseEntity<GpuServerResponses> findAllGpuServer(@PathVariable Long labId) {
        GpuServerResponses gpuServerResponses = gpuServerService.findAllGpuServer(labId);
        return ResponseEntity.ok()
                .body(gpuServerResponses);
    }


    @PutMapping("/{gpuId}")
    public ResponseEntity<Void> modify(
            @RequestBody GpuServerNameUpdateRequest gpuServerNameUpdateRequest,
            @PathVariable Long labId, @PathVariable Long gpuId) {
        gpuServerService.updateGpuServer(gpuServerNameUpdateRequest, labId, gpuId);

        return ResponseEntity.noContent()
                .build();
    }

    @DeleteMapping("/{gpuId}")
    public ResponseEntity<Void> delete(@PathVariable Long labId, @PathVariable Long gpuId) {
        gpuServerService.delete(labId, gpuId);

        return ResponseEntity.noContent()
                .build();
    }

    @ExceptionHandler(GpuServerServiceException.class)
    public ResponseEntity<ExceptionResponse> handleException(GpuServerServiceException e) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(e.getMessage());

        return ResponseEntity.badRequest()
                .body(exceptionResponse);
    }
}
