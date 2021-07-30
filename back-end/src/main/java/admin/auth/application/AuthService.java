package admin.auth.application;

import admin.auth.dto.LoginRequest;
import admin.auth.dto.LoginResponse;
import admin.auth.exception.AuthorizationException;
import admin.auth.infrastructure.JwtTokenProvider;
import admin.encryption.Encrypt;
import admin.member.domain.Member;
import admin.member.domain.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final Encrypt encrypt;

    public AuthService(MemberRepository memberRepository, JwtTokenProvider jwtTokenProvider,
            Encrypt encrypt) {
        this.memberRepository = memberRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.encrypt = encrypt;
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        Member member = memberRepository.findByEmail(request.getEmail())
                .orElseThrow(AuthorizationException.NOT_EXISTING_EMAIL::getException);
        String password = encrypt.hashedPassword(request.getPassword(), request.getEmail());

        if (!member.hasSamePassword(password)) {
            throw AuthorizationException.NOT_CORRECT_PASSWORD.getException();
        }

        String token = jwtTokenProvider.createToken(request.getEmail());
        return new LoginResponse(token);
    }

    @Transactional(readOnly = true)
    public Member findMemberByToken(String credentials) {
        if (!jwtTokenProvider.validateToken(credentials)) {
            throw AuthorizationException.INVALID_TOKEN.getException();
        }

        String email = jwtTokenProvider.getPayload(credentials);

        return memberRepository.findByEmail(email)
                .orElseThrow(AuthorizationException.INVALID_TOKEN::getException);
    }
}
