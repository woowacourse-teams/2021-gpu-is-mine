package admin.gpuserver.ui;

import admin.gpuserver.application.GpuServerService;
import admin.gpuserver.dto.request.GpuServerNameUpdateRequest;
import admin.gpuserver.dto.request.GpuServerRequest;
import admin.gpuserver.dto.response.EmptyJsonResponse;
import admin.gpuserver.dto.response.ExceptionResponse;
import admin.gpuserver.dto.response.GpuServerResponse;
import admin.gpuserver.dto.response.GpuServerResponses;
import admin.gpuserver.exception.GpuServerServiceException;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<EmptyJsonResponse> save(@RequestBody GpuServerRequest gpuServerRequest,
                                                  @PathVariable Long labId) {
        Long gpuServerId = gpuServerService.saveGpuServer(gpuServerRequest, labId);

        URI uri = URI.create("/api/labs/" + labId + "/gpus/" + gpuServerId);
        return ResponseEntity.created(uri)
                .body(new EmptyJsonResponse());
    }


    @GetMapping("/{gpuServerId}")
    public ResponseEntity<GpuServerResponse> findById(@PathVariable Long labId,
                                                      @PathVariable Long gpuServerId) {
        GpuServerResponse gpuServerResponse = gpuServerService.findById(labId, gpuServerId);

        return ResponseEntity.ok()
                .body(gpuServerResponse);
    }

    @GetMapping
    public ResponseEntity<GpuServerResponses> findAll(@PathVariable Long labId) {
        GpuServerResponses gpuServerResponses = gpuServerService.findAll(labId);
        return ResponseEntity.ok()
                .body(gpuServerResponses);
    }


    @PutMapping("/{gpuServerId}")
    public ResponseEntity<EmptyJsonResponse> modify(
            @RequestBody GpuServerNameUpdateRequest gpuServerNameUpdateRequest,
            @PathVariable Long labId, @PathVariable Long gpuServerId) {
        gpuServerService.updateGpuServer(gpuServerNameUpdateRequest, labId, gpuServerId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(new EmptyJsonResponse());
    }

    @DeleteMapping("/{gpuId}")
    public ResponseEntity<EmptyJsonResponse> delete(@PathVariable Long labId, @PathVariable Long gpuId) {
        gpuServerService.delete(labId, gpuId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(new EmptyJsonResponse());
    }

    @ExceptionHandler(GpuServerServiceException.class)
    public ResponseEntity<ExceptionResponse> handleException(GpuServerServiceException e) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(e.getMessage());

        return ResponseEntity.badRequest()
                .body(exceptionResponse);
    }
}
