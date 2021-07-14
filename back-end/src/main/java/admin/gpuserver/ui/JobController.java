package admin.gpuserver.ui;

import admin.gpuserver.application.JobService;
import admin.gpuserver.dto.request.JobRequest;
import admin.gpuserver.dto.response.JobResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController("/api/jobs")
public class JobController {

    private JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<JobResponse> findById(@PathVariable Long jobId) {
        JobResponse jobResponse = jobService.findById(jobId);
        return ResponseEntity.ok(jobResponse);
    }

    @PostMapping
    public ResponseEntity<Void> addJob(Long labUserId, @RequestBody JobRequest jobRequest) {
        Long jobId = jobService.insert(labUserId, jobRequest);

        URI uri = URI.create("/api/jobs/" + jobId);
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{jobId}")
    public ResponseEntity<Void> cancelJob(Long labUserId, @PathVariable Long jobId) {
        jobService.cancel(labUserId, jobId);
        return ResponseEntity.noContent().build();
    }
}
