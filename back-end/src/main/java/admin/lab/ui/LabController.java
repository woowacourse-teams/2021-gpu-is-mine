package admin.lab.ui;

import admin.lab.application.LabService;
import admin.lab.dto.LabRequest;
import admin.lab.dto.LabResponse;
import admin.lab.dto.LabResponses;
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
@RequestMapping("/api/labs")
public class LabController {
    private final LabService labService;

    public LabController(LabService labService) {
        this.labService = labService;
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody LabRequest labRequest) {
        Long createdId = labService.save(labRequest);
        URI uri = URI.create("/api/labs/" + createdId);
        return ResponseEntity.created(uri).build();
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
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{labId}")
    public ResponseEntity<Void> delete(@PathVariable Long labId) {
        labService.delete(labId);
        return ResponseEntity.noContent().build();
    }
}
