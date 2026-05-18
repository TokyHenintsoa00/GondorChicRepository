package itu.BackendGondorChic.client.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import itu.BackendGondorChic.client.dto.AuthResponse;
import itu.BackendGondorChic.client.dto.ClientLoginRequest;
import itu.BackendGondorChic.client.service.ClientService;

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