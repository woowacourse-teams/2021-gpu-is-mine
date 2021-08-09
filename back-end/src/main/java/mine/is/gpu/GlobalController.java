package mine.is.gpu;

import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GlobalController {

    Environment environment;

    public GlobalController(Environment environment) {
        this.environment = environment;
    }

    @GetMapping("/profiles")
    public String profile() {
        return String.join(", ", environment.getActiveProfiles());
    }
}
