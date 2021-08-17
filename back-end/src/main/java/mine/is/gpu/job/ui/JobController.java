package mine.is.gpu.job.ui;

import java.net.URI;
import mine.is.gpu.auth.domain.AuthenticationPrincipal;
import mine.is.gpu.job.application.JobService;
import mine.is.gpu.job.dto.request.JobRequest;
import mine.is.gpu.job.dto.request.JobUpdateRequest;
import mine.is.gpu.job.dto.response.JobResponse;
import mine.is.gpu.job.dto.response.JobResponses;
import mine.is.gpu.job.dto.response.LogsResponse;
import mine.is.gpu.job.dto.response.ParsedLogResponses;
import mine.is.gpu.mail.MailDto;
import mine.is.gpu.mail.MailService;
import mine.is.gpu.member.application.MemberService;
import mine.is.gpu.member.domain.Member;
import mine.is.gpu.pagination.Pagination;
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
    private MemberService memberService;

    public JobController(JobService jobService, MailService mailService,
                         MemberService memberService) {
        this.jobService = jobService;
        this.mailService = mailService;
        this.memberService = memberService;
    }

    @PostMapping("/jobs")
    public ResponseEntity<Void> save(@PathVariable Long labId, @AuthenticationPrincipal Member member,
                                     @RequestBody JobRequest jobRequest) {
        memberService.checkMemberOfServer(member.getId(), jobRequest.getGpuServerId());

        Long jobId = jobService.save(member.getId(), jobRequest);
        mailService.sendJobReserveMail(new MailDto(member.getEmail(), jobRequest.getName()));
        URI uri = URI.create("/api/labs/" + labId + "/jobs/" + jobId);
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/jobs/{jobId}")
    public ResponseEntity<JobResponse> findById(@PathVariable Long jobId, @AuthenticationPrincipal Member member) {
        memberService.checkReadableJob(member.getId(), jobId);

        JobResponse jobResponse = jobService.findById(jobId);
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
                                                @RequestParam(required = false) Long serverId,
                                                @RequestParam(required = false) String status,
                                                @Pagination Pageable pageable) {
        JobResponses jobResponses = jobService.findJobs(labId, serverId, status, pageable);
        return ResponseEntity.ok(jobResponses);
    }

    @PutMapping("/jobs/{jobId}")
    public ResponseEntity<Void> update(@PathVariable Long jobId,
                                       @AuthenticationPrincipal Member member,
                                       @RequestBody JobUpdateRequest jobUpdateRequest) {
        memberService.checkEditableJob(member.getId(), jobId);
        jobService.update(jobId, jobUpdateRequest);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/jobs/{jobId}/cancel")
    public ResponseEntity<Void> cancel(@PathVariable Long jobId,
                                       @AuthenticationPrincipal Member member) {
        memberService.checkEditableJob(member.getId(), jobId);
        JobResponse job = jobService.findById(jobId);
        jobService.cancel(jobId);
        mailService.sendJobCancelMail(new MailDto(member.getEmail(), job.getName()));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/jobs/{jobId}/logs")
    public ResponseEntity<LogsResponse> findLogAll(@PathVariable Long jobId,
                                                   @AuthenticationPrincipal Member member) {
        memberService.checkReadableJob(member.getId(), jobId);
        LogsResponse logsResponse = jobService.findLogAllById(jobId);
        return ResponseEntity.ok(logsResponse);
    }

    @GetMapping("/jobs/{jobId}/logs-graph")
    public ResponseEntity<ParsedLogResponses> findAllParsedLog(@PathVariable Long jobId,
                                                               @AuthenticationPrincipal Member member) {
        memberService.checkReadableJob(member.getId(), jobId);
        ParsedLogResponses parsedLogs = jobService.findParsedLogById(jobId);
        return ResponseEntity.ok(parsedLogs);
    }
}
