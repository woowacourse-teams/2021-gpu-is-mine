package gpu.is.mine.auth.ui;

import gpu.is.mine.auth.application.AuthService;
import gpu.is.mine.auth.exception.AuthorizationException;
import gpu.is.mine.auth.infrastructure.AuthorizationExtractor;
import gpu.is.mine.member.domain.Member;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class LoginInterceptor implements HandlerInterceptor {

    private static final Pattern pattern = Pattern.compile("(?<=labs\\/)\\d+");
    private final AuthService authService;

    public LoginInterceptor(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String credentials = AuthorizationExtractor.extract(request);
        if (credentials == null) {
            throw AuthorizationException.UNAUTHORIZED_USER.getException();
        }

        Member member = authService.findMemberByToken(credentials);
        Matcher labIdMatcher = pattern.matcher(request.getRequestURI());

        if (includeLabId(labIdMatcher) && !isMemberOfLab(member, labIdMatcher)) {
            throw AuthorizationException.UNAUTHORIZED_USER.getException();
        }
        return true;
    }

    private boolean isMemberOfLab(Member member, Matcher labIdMatcher) {
        String uriLabId = labIdMatcher.group();
        String memberLabId = member.getLab().getId().toString();
        return uriLabId.equals(memberLabId);
    }

    private boolean includeLabId(Matcher matcher) {
        return matcher.find();
    }
}
