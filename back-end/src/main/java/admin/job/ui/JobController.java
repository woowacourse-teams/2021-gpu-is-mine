package admin.job.ui;

import admin.auth.domain.AuthenticationPrincipal;
import admin.gpuserver.application.GpuServerService;
import admin.job.application.JobService;
import admin.job.dto.request.JobRequest;
import admin.job.dto.response.JobResponse;
import admin.job.dto.response.JobResponses;
import admin.member.application.MemberService;
import admin.member.domain.Member;
import java.net.URI;
import java.util.Objects;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
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
    private GpuServerService serverService;

    public JobController(MemberService memberService, JobService jobService,
            GpuServerService serverService) {
        this.memberService = memberService;
        this.jobService = jobService;
        this.serverService = serverService;
    }

    @PostMapping("/jobs")
    public ResponseEntity<Void> addJob(@PathVariable Long labId, @AuthenticationPrincipal Member member, @RequestBody JobRequest jobRequest) {
        Long jobId = jobService.insert(member.getId(), jobRequest);

        URI uri = URI.create("/api/labs/"+ labId +"/jobs/" + jobId);
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/jobs/{jobId}")
    public ResponseEntity<JobResponse> findJobById(@PathVariable Long jobId) {
        JobResponse jobResponse = jobService.findById(jobId);
        return ResponseEntity.ok(jobResponse);
    }

    @GetMapping("/jobs/me")
    public JobResponses findJobsOfMine(@AuthenticationPrincipal Member member,
            @RequestParam(required = false) String status) {
        if (StringUtils.hasText(status)) {
            return jobService.findJobsByMemberByStatus(member.getId(), status);
        }
        return jobService.findAllJobsByMember(member.getId());
    }

    @GetMapping("/jobs")
    public JobResponses findJobs(@PathVariable Long labId,
            @RequestParam(required = false) Long serverId,
            @RequestParam(required = false) String status) {
        if (Objects.isNull(serverId)) {

            if (StringUtils.hasText(status)) {
                return jobService.findJobsOfLabByStatus(labId, status);
            }
            return jobService.findAllJobsOfLab(labId);
        }

        serverService.checkServerInLab(serverId, labId);
        if (StringUtils.hasText(status)) {
            return jobService.findJobsOfServerByStatus(serverId, status);
        }
        return jobService.findAllJobsOfServer(serverId);
    }

    @PutMapping("/jobs/{jobId}")
    public ResponseEntity<Void> cancelJob(@PathVariable Long jobId, @AuthenticationPrincipal Member member) {
        memberService.checkEditableJob(member.getId(), jobId);

        jobService.cancel(jobId);
        return ResponseEntity.noContent().build();
    }
}
