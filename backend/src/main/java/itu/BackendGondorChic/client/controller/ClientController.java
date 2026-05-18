package itu.BackendGondorChic.client.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import itu.BackendGondorChic.client.dto.ClientRegistrationRequest;
import itu.BackendGondorChic.client.dto.ClientResponse;
import itu.BackendGondorChic.client.service.ClientService;

@RestController
@RequestMapping("/api/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @PostMapping("/register")
    public ResponseEntity<ClientResponse> register(@Valid @RequestBody ClientRegistrationRequest request) {
        return ResponseEntity.ok(clientService.register(request));
    }

    @GetMapping("/me")
    public ResponseEntity<ClientResponse> me(Authentication authentication) {
        return ResponseEntity.ok(clientService.getByPseudo(authentication.getName()));
    }
}