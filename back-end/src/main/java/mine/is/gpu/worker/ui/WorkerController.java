package mine.is.gpu.worker.ui;

import mine.is.gpu.job.dto.response.JobResponse;
import mine.is.gpu.worker.application.WorkerService;
import mine.is.gpu.worker.dto.WorkerJobRequest;
import mine.is.gpu.worker.dto.WorkerRequest;
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
        workerService.updateJobStatus(jobId, workerJobRequest);
        return ResponseEntity.ok().build();
    }

    @PutMapping("gpus/{serverId}/status")
    public ResponseEntity<Void> updateWorkerStatus(@PathVariable Long serverId,
                                                   @RequestBody WorkerRequest workerRequest) {
        workerService.updateWorkerStatus(serverId, workerRequest);
        return ResponseEntity.ok().build();
    }
}
