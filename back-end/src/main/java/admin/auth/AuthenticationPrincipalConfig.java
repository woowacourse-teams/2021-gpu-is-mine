package admin.auth;

import admin.auth.application.AuthService;
import admin.auth.ui.AuthenticationPrincipalArgumentResolver;
import admin.auth.ui.LoginInterceptor;
import java.util.List;
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
    //TODO
    //- interceptor 적용시 주석해제
    //- interceptor 적용할 path 설정
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginInterceptor)
                .excludePathPatterns("/api/login", "/api/labs/","/api/members/")
                .addPathPatterns("/api/**");
    }
}
