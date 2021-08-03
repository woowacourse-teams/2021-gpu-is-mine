package mine.is.gpu.auth.ui;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("URI path Regex 테스트")
class LoginInterceptorRegexTest {

    private static final Pattern pattern = Pattern.compile("(?<=labs\\/)\\d+");

    @DisplayName("URI 에서 labId 정보를 가져온다.")
    @Test
    void parseURI() {
        Matcher matcher = pattern.matcher("/api/labs/132/gpus/23/jobs");
        if (matcher.find()) {
            assertThat(matcher.group()).isEqualTo("132");
        }
    }

    @DisplayName("URI 에서 labId 정보가 없는 경우를 테스트한다.")
    @Test
    void parseURI_fail() {
        Matcher matcher = pattern.matcher("/api/labs");
        assertThat(matcher.find()).isFalse();
    }
}
