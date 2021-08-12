package mine.is.gpu.pagination.parser;

import org.springframework.data.domain.Pageable;

public interface PaginationParser {
    Pageable parse(String page, String size, String direction);
}
