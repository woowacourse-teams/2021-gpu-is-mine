package mine.is.gpu.joblog;

import static org.junit.jupiter.api.Assertions.*;

import io.restassured.RestAssured;
import mine.is.gpu.AcceptanceTest;
import org.junit.jupiter.api.Test;

class JobLogControllerTest extends AcceptanceTest {
    @Test
    void testGet() {
        search(23L);
    }

    private void search(Long jobId) {
        RestAssured.given()
                .when()
                .get("/api/elastic-search/" + jobId)
                .then()
                .log().all();
    }
}