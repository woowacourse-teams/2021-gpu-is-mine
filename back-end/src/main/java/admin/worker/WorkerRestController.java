package admin.worker;

import admin.job.dto.response.JobResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/workers/")
public class WorkerRestController {

    private final WorkerJobService jobService;

    public WorkerRestController(WorkerJobService jobService) {
        this.jobService = jobService;
    }

    // todo: worker가 본인이 실행하는 잡이 없을 때 우리스프링 서버에 get 요청을 함
    @GetMapping("{serverId}/job")
    public ResponseEntity<JobResponse> takeJob(@PathVariable Long serverId){
        JobResponse jobResponse = jobService.popJobByServerId(serverId);
        return ResponseEntity.ok(jobResponse);
    }

}
