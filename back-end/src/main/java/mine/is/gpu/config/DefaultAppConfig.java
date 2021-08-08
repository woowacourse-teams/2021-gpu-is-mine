package mine.is.gpu.config;

import java.util.Date;
import java.util.TimeZone;
import javax.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DefaultAppConfig {

    private static final Logger logger = LoggerFactory.getLogger(DefaultAppConfig.class);

    @PostConstruct
    private void setTimeZone() {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
        logger.info("Date : " + new Date());
    }
}
