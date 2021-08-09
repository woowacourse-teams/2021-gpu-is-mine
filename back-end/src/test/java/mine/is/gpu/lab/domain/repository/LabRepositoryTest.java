package mine.is.gpu.lab.domain.repository;

import static org.junit.jupiter.api.Assertions.assertThrows;

import mine.is.gpu.lab.domain.Lab;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;

@DataJpaTest
class LabRepositoryTest {
    @Autowired
    private LabRepository labRepository;

    @DisplayName("중복 이름 생성 테스트")
    @Test
    void duplicateName() {
        Lab lab = new Lab("lab");
        labRepository.save(lab);

        Lab sameLab = new Lab("lab");
        assertThrows(DataIntegrityViolationException.class, () -> labRepository.save(sameLab));
    }
}
