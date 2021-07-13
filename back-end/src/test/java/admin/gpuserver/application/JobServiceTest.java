//package admin.gpuserver.application;
//
//import admin.gpuserver.dto.request.JobRequest;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//class JobServiceTest {
//
//    @Autowired
//    JobService jobService;
//
//    @Test
//    public void insert(){
//        Long insert = jobService.insert(new JobRequest(1L, "hi", "bye", "1시간"));
//        assertThat(insert).isNotNull();
//    }
//}