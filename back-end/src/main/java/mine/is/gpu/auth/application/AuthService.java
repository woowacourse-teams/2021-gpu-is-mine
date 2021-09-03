package mine.is.gpu.auth.application;

import java.util.Optional;
import mine.is.gpu.admin.Account;
import mine.is.gpu.admin.Administrator;
import mine.is.gpu.admin.AdministratorRepository;
import mine.is.gpu.auth.dto.LoginRequest;
import mine.is.gpu.auth.dto.LoginResponse;
import mine.is.gpu.auth.exception.AuthorizationException;
import mine.is.gpu.auth.infrastructure.JwtTokenProvider;
import mine.is.gpu.encryption.Encrypt;
import mine.is.gpu.member.domain.Member;
import mine.is.gpu.member.domain.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final AdministratorRepository administratorRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final Encrypt encrypt;

    public AuthService(MemberRepository memberRepository, AdministratorRepository administratorRepository,
                       JwtTokenProvider jwtTokenProvider, Encrypt encrypt) {
        this.memberRepository = memberRepository;
        this.administratorRepository = administratorRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.encrypt = encrypt;
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        Account account = findUser(request);
        String password = encrypt.hashedPassword(request.getPassword(), request.getEmail());

        if (!account.hasSamePassword(password)) {
            throw AuthorizationException.NOT_CORRECT_PASSWORD.getException();
        }

        String token = jwtTokenProvider.createToken(request.getEmail());
        Long validityInMilliseconds = jwtTokenProvider.getValidityInMilliseconds();
        return new LoginResponse(token, validityInMilliseconds);
    }

    private Account findUser(LoginRequest request) {
        Optional<Administrator> optionalAdmin = administratorRepository.findByEmail(request.getEmail());
        if (optionalAdmin.isPresent()) {
            return optionalAdmin.get();
        }

        return memberRepository.findByEmail(request.getEmail())
                .orElseThrow(AuthorizationException.NOT_EXISTING_EMAIL::getException);
    }

    @Transactional(readOnly = true)
    public Member findMemberByToken(String credentials) {
        validateToken(credentials);

        String email = jwtTokenProvider.getPayload(credentials);

        return memberRepository.findByEmail(email)
                .orElseThrow(AuthorizationException.INVALID_TOKEN::getException);
    }

    @Transactional(readOnly = true)
    public Boolean existMemberByToken(String credentials) {
        validateToken(credentials);

        String email = jwtTokenProvider.getPayload(credentials);

        return memberRepository.existsByEmail(email);
    }

    @Transactional(readOnly = true)
    public Boolean existAdministratorByToken(String credentials) {
        validateToken(credentials);

        String email = jwtTokenProvider.getPayload(credentials);

        return administratorRepository.existsByEmail(email);
    }

    private void validateToken(String credentials) {
        if (!jwtTokenProvider.validateToken(credentials)) {
            throw AuthorizationException.INVALID_TOKEN.getException();
        }
    }
}
