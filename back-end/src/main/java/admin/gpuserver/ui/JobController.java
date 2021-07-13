package admin.gpuserver.ui;

import admin.gpuserver.application.JobService;
import admin.gpuserver.dto.request.JobRequest;
import admin.gpuserver.dto.response.EmptyJsonResponse;
import admin.gpuserver.dto.response.JobResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController("/api/jobs")
public class JobController {

    // TODO :: login 기능
    // 그 전까지 파라미터로 처리하도록. ex, ?labUserId=1

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
    public ResponseEntity<EmptyJsonResponse> addJob(Long labUserId, @RequestBody JobRequest jobRequest) {
        Long jobId = jobService.insert(labUserId, jobRequest);

        URI uri = URI.create("/api/jobs/" + jobId);
        return ResponseEntity.created(uri).body(new EmptyJsonResponse());
    }

    @PutMapping("/{jobId}")
    public ResponseEntity<EmptyJsonResponse> cancelJob(Long labUserId, @PathVariable Long jobId) {
        jobService.cancel(labUserId, jobId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new EmptyJsonResponse());
    }

    @PostMapping("/{jobId}/completed")
    public void completedJob(@PathVariable Long jobId) {
        jobService.complete(jobId);
    }
}
