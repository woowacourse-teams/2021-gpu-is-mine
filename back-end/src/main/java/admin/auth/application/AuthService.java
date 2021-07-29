package admin.auth.application;

import admin.auth.dto.LoginRequest;
import admin.auth.dto.LoginResponse;
import admin.auth.exception.AuthorizationException;
import admin.auth.infrastructure.JwtTokenProvider;
import admin.member.domain.Member;
import admin.member.domain.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private MemberRepository memberRepository;
    private JwtTokenProvider jwtTokenProvider;

    public AuthService(MemberRepository memberRepository, JwtTokenProvider jwtTokenProvider) {
        this.memberRepository = memberRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        Member member = memberRepository.findByEmail(request.getEmail())
                .orElseThrow(AuthorizationException.NOT_EXISTING_EMAIL::getException);

        if (!member.hasSamePassword(request.getPassword(), request.getEmail())) {
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
