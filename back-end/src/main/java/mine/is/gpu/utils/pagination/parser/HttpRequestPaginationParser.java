package mine.is.gpu.utils.pagination.parser;

import java.util.Objects;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Component;

@Component
public class HttpRequestPaginationParser implements PaginationParser {

    private static final String DEFAULT_ORDERED_BY_PROPERTY = "id";
    private static final Direction DEFAULT_DIRECTION = Direction.ASC;

    @Override
    public Pageable parse(String pageParam, String sizeParam, String sortParam) {
        int page = Integer.parseInt(pageParam);
        int size = Integer.parseInt(sizeParam);

        if (Objects.isNull(sortParam)) {
            return PageRequest.of(page, size);
        }
        return PageRequest.of(page, size, decideSortByParam(sortParam));
    }

    private Sort decideSortByParam(String sortParam) {
        if (Objects.isNull(sortParam)) {
            return Sort.by(DEFAULT_DIRECTION, DEFAULT_ORDERED_BY_PROPERTY);
        }

        String[] listOfSortParam = sortParam.split(",");

        if (listOfSortParam.length < 2) {
            return Sort.by(DEFAULT_DIRECTION, sortParam);
        }

        String sortBy = listOfSortParam[0];
        String sortDir = listOfSortParam[1];

        if (sortDir.equalsIgnoreCase("desc")) {
            return Sort.by(Direction.DESC, sortBy);
        }
        return Sort.by(Direction.ASC, sortBy);
    }
}
