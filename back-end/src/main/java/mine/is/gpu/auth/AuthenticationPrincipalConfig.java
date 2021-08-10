package mine.is.gpu.auth;

import java.util.List;
import mine.is.gpu.auth.application.AuthService;
import mine.is.gpu.auth.ui.AuthenticationPrincipalArgumentResolver;
import mine.is.gpu.auth.ui.LoginInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AuthenticationPrincipalConfig implements WebMvcConfigurer {

    private final AuthService authService;
    private final LoginInterceptor loginInterceptor;

    public AuthenticationPrincipalConfig(AuthService authService, LoginInterceptor loginInterceptor) {
        this.authService = authService;
        this.loginInterceptor = loginInterceptor;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(createAuthenticationPrincipalArgumentResolver());
    }

    @Bean
    public AuthenticationPrincipalArgumentResolver createAuthenticationPrincipalArgumentResolver() {
        return new AuthenticationPrincipalArgumentResolver(authService);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginInterceptor)
                .addPathPatterns("/api/labs/{*id}/**");
    }
}
