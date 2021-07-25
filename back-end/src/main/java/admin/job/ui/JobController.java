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

    @GetMapping("/jobs/{jobId}")
    public ResponseEntity<JobResponse> findJobById(Long memberId, @PathVariable Long jobId) {
        memberService.checkReadableJob(memberId, jobId);

        JobResponse jobResponse = jobService.findById(jobId);
        return ResponseEntity.ok(jobResponse);
    }

    /*
     멤버를 기준으로 Job 조회, 현재는 Job 조회의 일종으로 보았습니다.
     추후에 "members/me" 관련 기능들이 구현되면 그 컨트롤러와 합쳐도 좋을 것 같습니다.
     */

    @GetMapping("/members/me/jobs")
    public ResponseEntity<JobResponses> findJobsByMember(Long memberId) {
        return ResponseEntity.ok(jobService.findByMember(memberId));
    }

    @GetMapping("/labs/{labId}/jobs")
    public ResponseEntity<JobResponses> findJobsByLab(Long memberId, @PathVariable Long labId) {
        memberService.checkPermissionOnLab(memberId, labId);

        JobResponses jobResponses = jobService.findByLab(labId);
        return ResponseEntity.ok(jobResponses);
    }

     /*
     기존의 "/labs/{labId}/gpus/{gpuServerId}/jobs" 꼴을 맞추면, labId가 의미가 없어 labId에 대한 유효성 검증이 필요합니다.
     */

    @GetMapping("/labs/{labId}/gpus/{gpuServerId}/jobs")
    public ResponseEntity<JobResponses> findJobsByServer(Long memberId, @PathVariable Long gpuServerId) {
        memberService.checkPermissionOnServer(memberId, gpuServerId);

        JobResponses jobResponses = jobService.findByServer(gpuServerId);
        return ResponseEntity.ok(jobResponses);
    }
}
