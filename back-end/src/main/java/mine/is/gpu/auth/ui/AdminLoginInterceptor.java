package mine.is.gpu.auth.ui;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import mine.is.gpu.auth.application.AuthService;
import mine.is.gpu.auth.exception.AuthorizationException;
import mine.is.gpu.auth.infrastructure.AuthorizationExtractor;
import mine.is.gpu.member.domain.Member;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AdminLoginInterceptor implements HandlerInterceptor {

    private final AuthService authService;

    public AdminLoginInterceptor(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            return true;
        }

        String credentials = AuthorizationExtractor.extract(request);
        if (credentials == null) {
            throw AuthorizationException.UNAUTHORIZED_USER.getException();
        }

        if (isManagerAvailableMethods(request) && authService.existMemberByToken(credentials)) {
            Member member = authService.findMemberByToken(credentials);
            checkManager(member);
            return true;
        }

        if (!authService.existAdministratorByToken(credentials)) {
            throw AuthorizationException.UNAUTHORIZED_USER.getException();
        }

        return true;
    }

    private void checkManager(Member member) {
        if (!member.isManager()) {
            throw AuthorizationException.UNAUTHORIZED_USER.getException();
        }
    }

    private boolean isManagerAvailableMethods(HttpServletRequest request) {
        if (HttpMethod.DELETE.matches(request.getMethod()) || HttpMethod.PUT.matches(request.getMethod())) {
            return true;
        }
        return HttpMethod.GET.matches(request.getMethod())
                && request.getRequestURI().matches(".*labs/\\d+");
    }
}
