package itu.gondorchic.client.controller;

import itu.gondorchic.client.dto.AuthResponse;
import itu.gondorchic.client.dto.ClientLoginRequest;
import itu.gondorchic.client.service.ClientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final ClientService clientService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody ClientLoginRequest request) {
        return ResponseEntity.ok(clientService.login(request));
    }
}
