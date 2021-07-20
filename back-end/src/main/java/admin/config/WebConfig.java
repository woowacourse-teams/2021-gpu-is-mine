package admin.config;

import ch.qos.logback.access.servlet.TeeFilter;
import com.sun.tools.javac.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.stream.Collectors;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${request.origins}")
    private String[] origins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        System.out.println(Arrays.stream(origins).collect(Collectors.joining("K")));
        registry.addMapping("/**")
                .allowedOrigins("https://tf2ll.csb.app")
                .allowedMethods("*")
                .allowedHeaders("content-type")
                .exposedHeaders("location");
    }

    @Bean
    public FilterRegistrationBean requestLoggingFilter() {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean(new TeeFilter());
        return filterRegistrationBean;
    }
}
