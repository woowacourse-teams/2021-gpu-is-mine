package admin.job.ui;

import admin.job.application.JobService;
import admin.job.dto.request.JobRequest;
import admin.job.dto.response.JobResponse;
import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/jobs")
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
    public ResponseEntity<Void> addJob(Long memberId, @RequestBody JobRequest jobRequest) {
        Long jobId = jobService.insert(memberId, jobRequest);

        URI uri = URI.create("/api/jobs/" + jobId);
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{jobId}")
    public ResponseEntity<Void> cancelJob(Long memberId, @PathVariable Long jobId) {
        jobService.cancel(memberId, jobId);
        return ResponseEntity.noContent().build();
    }
}
