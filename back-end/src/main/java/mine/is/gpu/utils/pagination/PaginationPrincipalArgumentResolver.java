package mine.is.gpu.utils.pagination;

import java.util.Objects;
import javax.servlet.http.HttpServletRequest;
import mine.is.gpu.utils.pagination.parser.PaginationParser;
import org.springframework.core.MethodParameter;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

public class PaginationPrincipalArgumentResolver implements HandlerMethodArgumentResolver {

    private PaginationParser paginationParser;

    public PaginationPrincipalArgumentResolver(PaginationParser paginationParser) {
        this.paginationParser = paginationParser;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(Pagination.class);
    }

    @Override
    public Pageable resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
            NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {

        HttpServletRequest httpRequest = webRequest.getNativeRequest(HttpServletRequest.class);
        String pageParam = httpRequest.getParameter("page");
        String sizeParam = httpRequest.getParameter("size");
        String sortParam = httpRequest.getParameter("sort");

        if (Objects.isNull(pageParam) || Objects.isNull(sizeParam)) {
            return null;
        }
        return paginationParser.parse(pageParam, sizeParam, sortParam);
    }
}
