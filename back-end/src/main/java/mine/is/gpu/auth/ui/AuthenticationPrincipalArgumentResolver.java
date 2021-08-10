package mine.is.gpu.auth.ui;

import javax.servlet.http.HttpServletRequest;
import mine.is.gpu.auth.application.AuthService;
import mine.is.gpu.auth.domain.AuthenticationPrincipal;
import mine.is.gpu.auth.infrastructure.AuthorizationExtractor;
import mine.is.gpu.member.domain.Member;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

public class AuthenticationPrincipalArgumentResolver implements HandlerMethodArgumentResolver {

    private final AuthService authService;

    public AuthenticationPrincipalArgumentResolver(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(AuthenticationPrincipal.class);
    }

    @Override
    public Member resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        String credentials = AuthorizationExtractor
                .extract(webRequest.getNativeRequest(HttpServletRequest.class));
        return authService.findMemberByToken(credentials);
    }
}
