package admin.config;

import ch.qos.logback.access.servlet.TeeFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${request.origins}")
    private String[] origins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(origins)
                .allowedMethods("*")
                .allowedHeaders(HttpHeaders.CONTENT_TYPE)
                .exposedHeaders(HttpHeaders.LOCATION);
    }

    @Bean
    public FilterRegistrationBean<TeeFilter> requestLoggingFilter() {
        return new FilterRegistrationBean<>(new TeeFilter());
    }
}
