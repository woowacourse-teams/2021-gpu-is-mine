package admin.worker.ui;

import admin.job.dto.response.JobResponse;
import admin.worker.application.WorkerService;
import admin.worker.dto.WorkerJobLogRequest;
import admin.worker.dto.WorkerJobRequest;
import admin.worker.dto.WorkerRequest;
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
@RequestMapping("/api/workers/")
public class WorkerController {

    private final WorkerService workerService;

    public WorkerController(WorkerService workerService) {
        this.workerService = workerService;
    }

    @GetMapping("gpus/{serverId}/job")
    public ResponseEntity<JobResponse> takeJob(@PathVariable Long serverId) {
        JobResponse jobResponse = workerService.popJobByServerId(serverId);
        return ResponseEntity.ok(jobResponse);
    }

    @PutMapping("jobs/{jobId}/status")
    public ResponseEntity<Void> updateJobStatus(@PathVariable Long jobId,
            @RequestBody WorkerJobRequest workerJobRequest) {
        workerService.changeJobStatus(jobId, workerJobRequest);
        return ResponseEntity.ok().build();
    }

    @PutMapping("gpus/{serverId}/status")
    public ResponseEntity<Void> updateWorkerStatus(@PathVariable Long serverId,
            @RequestBody WorkerRequest workerRequest) {
        workerService.updateWorkerStatus(serverId, workerRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("jobs/{jobId}/log")
    public ResponseEntity<Void> saveLog(@PathVariable Long jobId,
        @RequestBody WorkerJobLogRequest workerJobLogRequest) {
        Long logId = workerService.saveLog(jobId, workerJobLogRequest);

        URI uri = URI.create("/api/workers/jobs/" + jobId + "/log/" + logId);
        return ResponseEntity.created(uri).build();
    }
}
