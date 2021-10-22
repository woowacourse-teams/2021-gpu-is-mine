package mine.is.gpu.job.ui;

import java.net.URI;
import mine.is.gpu.account.domain.Member;
import mine.is.gpu.auth.domain.AuthenticationPrincipal;
import mine.is.gpu.infra.MailDto;
import mine.is.gpu.infra.MailService;
import mine.is.gpu.job.application.JobService;
import mine.is.gpu.job.dto.request.JobRequest;
import mine.is.gpu.job.dto.request.JobUpdateRequest;
import mine.is.gpu.job.dto.response.JobResponse;
import mine.is.gpu.job.dto.response.JobResponses;
import mine.is.gpu.job.dto.response.LogsResponse;
import mine.is.gpu.job.dto.response.ParsedLogResponses;
import mine.is.gpu.utils.pagination.Pagination;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/labs/{labId}")
public class JobController {
    private JobService jobService;
    private MailService mailService;

    public JobController(JobService jobService, MailService mailService) {
        this.jobService = jobService;
        this.mailService = mailService;
    }

    @PostMapping("/jobs")
    public ResponseEntity<Void> save(@PathVariable Long labId, @AuthenticationPrincipal Member member,
                                     @RequestBody JobRequest jobRequest) {
        Long jobId = jobService.save(member.getId(), jobRequest);
        mailService.sendJobReserveMail(new MailDto(member.getEmail(), jobRequest.getName()));
        URI uri = URI.create("/api/labs/" + labId + "/jobs/" + jobId);
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/jobs/{jobId}")
    public ResponseEntity<JobResponse> findById(@PathVariable Long jobId, @AuthenticationPrincipal Member member) {
        JobResponse jobResponse = jobService.findById(member.getId(), jobId);
        return ResponseEntity.ok(jobResponse);
    }

    @GetMapping("/jobs/me")
    public ResponseEntity<JobResponses> findJobsOfMine(@AuthenticationPrincipal Member member,
                                                       @RequestParam(required = false) String status,
                                                       @Pagination Pageable pageable) {
        JobResponses jobResponses = jobService.findJobsOfMember(member.getId(), status, pageable);
        return ResponseEntity.ok(jobResponses);
    }

    @GetMapping("/jobs")
    public ResponseEntity<JobResponses> findAll(@PathVariable Long labId,
                                                @AuthenticationPrincipal Member member,
                                                @RequestParam(required = false) Long serverId,
                                                @RequestParam(required = false) String status,
                                                @Pagination Pageable pageable) {
        JobResponses jobResponses = jobService.findJobs(member.getId(), labId, serverId, status, pageable);
        return ResponseEntity.ok(jobResponses);
    }

    @PutMapping("/jobs/{jobId}")
    public ResponseEntity<Void> update(@PathVariable Long jobId,
                                       @AuthenticationPrincipal Member member,
                                       @RequestBody JobUpdateRequest jobUpdateRequest) {
        jobService.update(member.getId(), jobId, jobUpdateRequest);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/jobs/{jobId}/cancel")
    public ResponseEntity<Void> cancel(@PathVariable Long jobId,
                                       @AuthenticationPrincipal Member member) {
        JobResponse job = jobService.findById(member.getId(), jobId);
        jobService.cancel(member.getId(), jobId);
        mailService.sendJobCancelMail(new MailDto(member.getEmail(), job.getName()));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/jobs/{jobId}/logs")
    public ResponseEntity<LogsResponse> findLogAll(@PathVariable Long jobId,
                                                   @AuthenticationPrincipal Member member) {
        LogsResponse logsResponse = jobService.findLogAllById(member.getId(), jobId);
        return ResponseEntity.ok(logsResponse);
    }

    @GetMapping("/jobs/{jobId}/logs-graph")
    public ResponseEntity<ParsedLogResponses> findAllParsedLog(@PathVariable Long jobId,
                                                               @AuthenticationPrincipal Member member) {
        ParsedLogResponses parsedLogs = jobService.findParsedLogById(member.getId(), jobId);
        return ResponseEntity.ok(parsedLogs);
    }
}
