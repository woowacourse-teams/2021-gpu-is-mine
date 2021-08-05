package mine.is.gpu.member.domain.repository;

import static org.junit.jupiter.api.Assertions.assertThrows;

import mine.is.gpu.lab.domain.Lab;
import mine.is.gpu.member.domain.Member;
import mine.is.gpu.member.domain.MemberType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.annotation.DirtiesContext;

@DataJpaTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class MemberRepositoryTest {
    @Autowired
    private MemberRepository memberRepository;

    @DisplayName("중복 이메일 생성 테스트")
    @Test
    void duplicateEmail() {
        String email = "email@email.com";

        Lab lab1 = new Lab("lab1");
        Member member = new Member(email, "12345", "name1", MemberType.MANAGER, lab1);
        memberRepository.save(member);

        Lab lab2 = new Lab("lab2");
        Member memberSameEmail = new Member(email, "54321", "name2", MemberType.USER, lab2);
        assertThrows(DataIntegrityViolationException.class, () -> memberRepository.save(memberSameEmail));
    }
}
