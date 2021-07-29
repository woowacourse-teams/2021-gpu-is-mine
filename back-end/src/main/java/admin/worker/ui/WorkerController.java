package admin.worker.ui;

import admin.job.application.JobService;
import admin.job.domain.JobStatus;
import admin.job.dto.response.JobResponse;
import admin.mail.MailDto;
import admin.mail.MailService;
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
    private final MailService mailService;
    private final JobService jobService;

    public WorkerController(WorkerService workerService, MailService mailService,
        JobService jobService) {
        this.workerService = workerService;
        this.mailService = mailService;
        this.jobService = jobService;
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
        MailDto mailDto = jobService.mailDtoOfJob(jobId);
        if (workerJobRequest.getJobStatus() == JobStatus.RUNNING) {
            //지금 어떤 상태든 받아드릴준비가 되어있다. cancel도 실행가능하다.
            mailService.sendJobStartMail(mailDto);
        }
        if (workerJobRequest.getJobStatus() == JobStatus.WAITING) {
            mailService.sendJobEndMail(mailDto);
        }
        return ResponseEntity.ok().build();
    }

    @PutMapping("jobs/{jobId}/start")
    public ResponseEntity<Void> start(@PathVariable Long jobId) {
        workerService.start(jobId);
        MailDto mailDto = jobService.mailDtoOfJob(jobId);
        mailService.sendJobStartMail(mailDto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("jobs/{jobId}/end")
    public ResponseEntity<Void> end(@PathVariable Long jobId) {
        workerService.end(jobId);
        MailDto mailDto = jobService.mailDtoOfJob(jobId);
        mailService.sendJobStartMail(mailDto);
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
