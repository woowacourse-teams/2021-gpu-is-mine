package mine.is.gpu.worker.ui;

import mine.is.gpu.infra.MailDto;
import mine.is.gpu.infra.MailService;
import mine.is.gpu.job.application.JobService;
import mine.is.gpu.job.domain.JobStatus;
import mine.is.gpu.job.dto.response.JobResponse;
import mine.is.gpu.worker.application.WorkerService;
import mine.is.gpu.worker.dto.WorkerJobRequest;
import mine.is.gpu.worker.dto.WorkerRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(WorkerController.class);

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
            mailService.sendJobStartMail(mailDto);
        }
        if (workerJobRequest.getJobStatus() == JobStatus.COMPLETED) {
            mailService.sendJobCompleteMail(mailDto);
        }
        if (workerJobRequest.getJobStatus() == JobStatus.FAILED) {
            mailService.sendJobFailMail(mailDto);
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("jobs/{jobId}/start")
    public ResponseEntity<Void> start(@PathVariable Long jobId) {
        workerService.start(jobId);
        MailDto mailDto = jobService.mailDtoOfJob(jobId);
        mailService.sendJobStartMail(mailDto);
        logger.info("job #" + jobId + " is started");
        return ResponseEntity.ok().build();
    }

    @PostMapping("jobs/{jobId}/complete")
    public ResponseEntity<Void> complete(@PathVariable Long jobId) {
        workerService.complete(jobId);
        MailDto mailDto = jobService.mailDtoOfJob(jobId);
        mailService.sendJobCompleteMail(mailDto);
        logger.info("job #" + jobId + " is completed");
        return ResponseEntity.ok().build();
    }

    @PostMapping("jobs/{jobId}/fail")
    public ResponseEntity<Void> fail(@PathVariable Long jobId) {
        workerService.fail(jobId);
        MailDto mailDto = jobService.mailDtoOfJob(jobId);
        mailService.sendJobFailMail(mailDto);
        logger.info("job #" + jobId + " is completed");
        return ResponseEntity.ok().build();
    }

    @PutMapping("gpus/{serverId}/status")
    public ResponseEntity<Void> updateWorkerStatus(@PathVariable Long serverId,
                                                   @RequestBody WorkerRequest workerRequest) {
        workerService.updateWorkerStatus(serverId, workerRequest);
        return ResponseEntity.ok().build();
    }
}
