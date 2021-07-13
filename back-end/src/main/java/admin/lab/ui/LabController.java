package admin.lab.ui;

import admin.gpuserver.dto.response.ExceptionResponse;
import admin.gpuserver.exception.GpuServerServiceException;
import admin.lab.application.LabService;
import admin.lab.dto.LabRequest;
import admin.lab.dto.LabResponse;
import admin.lab.dto.LabResponses;
import admin.lab.exception.LabException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/labs/")
public class LabController {
    private final LabService labService;

    public LabController(LabService labService) {
        this.labService = labService;
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody LabRequest labRequest) {
        Long createdId = labService.save(labRequest);
        URI uri = URI.create("/api/labs/" + createdId);
        return ResponseEntity.created(uri)
                .build();
    }


    @GetMapping("/{labId}")
    public ResponseEntity<LabResponse> findById(@PathVariable Long labId) {
        LabResponse labResponse = labService.findById(labId);
        return ResponseEntity.ok(labResponse);
    }

    @GetMapping
    public ResponseEntity<LabResponses> findAll() {
        LabResponses labResponses = labService.findAll();
        return ResponseEntity.ok(labResponses);
    }

    @PutMapping("/{labId}")
    public ResponseEntity<Void> update(@PathVariable Long labId, @RequestBody LabRequest labRequest) {
        labService.update(labId, labRequest);
        return ResponseEntity.noContent()
                .build();
    }

    @DeleteMapping("/{labId}")
    public ResponseEntity<Void> delete(@PathVariable Long labId) {
        labService.delete(labId);
        return ResponseEntity.noContent()
                .build();
    }

    @ExceptionHandler(LabException.class)
    public ResponseEntity<ExceptionResponse> handleException(GpuServerServiceException e) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(e.getMessage());
        return ResponseEntity.badRequest()
                .body(exceptionResponse);
    }
}
