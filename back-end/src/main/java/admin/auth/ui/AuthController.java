package admin.auth.ui;

import admin.auth.application.AuthService;
import admin.auth.dto.TokenRequest;
import admin.auth.dto.TokenResponse;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/api/login/token")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody TokenRequest request) {
        TokenResponse token = authService.login(request);

        return ResponseEntity.ok(token);
    }
}
