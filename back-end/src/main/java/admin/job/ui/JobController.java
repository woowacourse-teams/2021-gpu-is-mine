package admin.job.ui;

import admin.job.application.JobService;
import admin.job.dto.request.JobRequest;
import admin.job.dto.response.JobResponse;
import admin.job.dto.response.JobResponses;
import admin.member.application.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api")
public class JobController {

    private MemberService memberService;
    private JobService jobService;

    public JobController(MemberService memberService, JobService jobService) {
        this.memberService = memberService;
        this.jobService = jobService;
    }

    @GetMapping("/jobs/{jobId}")
    public ResponseEntity<JobResponse> findById(Long memberId, @PathVariable Long jobId) {
        memberService.checkReadableJob(memberId, jobId);

        JobResponse jobResponse = jobService.findById(jobId);
        return ResponseEntity.ok(jobResponse);
    }

    @PostMapping("/jobs")
    public ResponseEntity<Void> addJob(Long memberId, @RequestBody JobRequest jobRequest) {
        memberService.checkPermissionOnServer(memberId, jobRequest.getGpuServerId());
        Long jobId = jobService.insert(memberId, jobRequest);

        URI uri = URI.create("/api/jobs/" + jobId);
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/jobs/{jobId}")
    public ResponseEntity<Void> cancelJob(Long memberId, @PathVariable Long jobId) {
        memberService.checkEditableJob(memberId, jobId);

        jobService.cancel(jobId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/members/me/jobs")
    public ResponseEntity<JobResponses> findJobsByMember(Long memberId) {
        return ResponseEntity.ok(jobService.findByMember(memberId));
    }

    @GetMapping("/labs/{labId}/jobs")
    public ResponseEntity<JobResponses> findJobsByLab(Long memberId, Long labId) {
        memberService.checkPermissionOnLab(memberId, labId);

        JobResponses jobResponses = jobService.findByLab(labId);
        return ResponseEntity.ok(jobResponses);
    }

    @GetMapping("/labs/{labId}/gpus/{gpuServerId}/jobs")
    public ResponseEntity<JobResponses> findJobsByServer(Long memberId, @PathVariable Long gpuServerId) {
        memberService.checkPermissionOnServer(memberId, gpuServerId);

        JobResponses jobResponses = jobService.findByServer(gpuServerId);
        return ResponseEntity.ok(jobResponses);
    }
}
