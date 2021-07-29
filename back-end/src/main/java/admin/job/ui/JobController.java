package admin.job.ui;

import admin.auth.domain.AuthenticationPrincipal;
import admin.job.application.JobService;
import admin.job.dto.request.JobRequest;
import admin.job.dto.response.JobResponse;
import admin.job.dto.response.JobResponses;
import admin.mail.MailDto;
import admin.mail.MailService;
import admin.member.application.MemberService;
import admin.member.domain.Member;
import java.net.URI;
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

    private MemberService memberService;
    private JobService jobService;
    private MailService mailService;

    public JobController(MemberService memberService, JobService jobService, MailService mailService) {
        this.memberService = memberService;
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
    public ResponseEntity<JobResponse> findJobById(@PathVariable Long jobId) {
        JobResponse jobResponse = jobService.findById(jobId);
        return ResponseEntity.ok(jobResponse);
    }

    @GetMapping("/jobs/me")
    public ResponseEntity<JobResponses> findJobsOfMine(@AuthenticationPrincipal Member member,
            @RequestParam(required = false) String status) {
        JobResponses jobResponses = jobService.findJobsOfMember(member.getId(), status);
        return ResponseEntity.ok(jobResponses);
    }

    @GetMapping("/jobs")
    public ResponseEntity<JobResponses> findJobs(@PathVariable Long labId,
            @RequestParam(required = false) Long serverId,
            @RequestParam(required = false) String status) {
        JobResponses jobResponses = jobService.findJobs(labId, serverId, status);
        return ResponseEntity.ok(jobResponses);
    }

    @PutMapping("/jobs/{jobId}")
    public ResponseEntity<Void> cancel(@PathVariable Long jobId, @AuthenticationPrincipal Member member) {
        memberService.checkEditableJob(member.getId(), jobId);

        JobResponse job = jobService.findById(jobId);
        jobService.cancel(jobId);
        mailService.sendJobCancelMail(new MailDto(member.getEmail(), job.getName()));

        return ResponseEntity.noContent().build();
    }
}
