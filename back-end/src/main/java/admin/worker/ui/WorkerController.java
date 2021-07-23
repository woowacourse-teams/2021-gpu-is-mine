package admin.worker.ui;

import admin.job.dto.response.JobResponse;
import admin.worker.dto.WorkerRequest;
import admin.worker.application.WorkerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/workers/")
public class WorkerController {

    private final WorkerService jobService;

    public WorkerController(WorkerService jobService) {
        this.jobService = jobService;
    }

    @GetMapping("gpus/{serverId}/job")
    public ResponseEntity<JobResponse> takeJob(@PathVariable Long serverId) {
        JobResponse jobResponse = jobService.popJobByServerId(serverId);
        return ResponseEntity.ok(jobResponse);
    }

    @PutMapping("jobs/{jobId}/status/running")
    public ResponseEntity<Void> updateJobStatus(@PathVariable Long jobId) {
        jobService.changeJobStatus(jobId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("gpus/{serverId}/status")
    public ResponseEntity<Void> updateWorkerStatus(@PathVariable Long serverId,
            @RequestBody WorkerRequest workerRequest) {
        jobService.updateWorkerStatus(serverId, workerRequest);
        return ResponseEntity.ok().build();
    }

}
