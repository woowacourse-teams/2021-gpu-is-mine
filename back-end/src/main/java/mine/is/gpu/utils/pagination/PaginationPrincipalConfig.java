package mine.is.gpu.utils.pagination;

import java.util.List;
import mine.is.gpu.utils.pagination.parser.PaginationParser;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class PaginationPrincipalConfig implements WebMvcConfigurer {

    private PaginationParser paginationParser;

    public PaginationPrincipalConfig(PaginationParser paginationParser) {
        this.paginationParser = paginationParser;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(new PaginationPrincipalArgumentResolver(paginationParser));
    }
}
