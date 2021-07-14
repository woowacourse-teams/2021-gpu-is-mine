package queue;


import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Disabled
public class QueueServiceTest {

    @Autowired
    private QueueService queueService;

    @DisplayName("queue 생성")
    @Test
    void createQueue() {
        queueService.createLearningConnection(1L);
    }

    @DisplayName("queue 메세지 전달")
    @Test
    void message() {
        queueService.pushMessage("testMessage1", 1L);
    }

    @DisplayName("queue 삭제")
    @Test
    void deleteQueue() {
        queueService.deleteQueue(1L);
    }

}