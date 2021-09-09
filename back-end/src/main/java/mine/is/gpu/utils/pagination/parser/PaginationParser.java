package mine.is.gpu.utils.pagination.parser;

import org.springframework.data.domain.Pageable;

public interface PaginationParser {
    Pageable parse(String page, String size, String direction);
}
