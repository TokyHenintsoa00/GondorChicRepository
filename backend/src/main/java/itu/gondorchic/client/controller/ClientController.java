package itu.gondorchic.client.controller;

import itu.gondorchic.common.ApiResponse;
import itu.gondorchic.client.dto.ClientResponse;
import itu.gondorchic.client.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<ClientResponse>> me(Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.ok(clientService.getByPseudo(authentication.getName())));
    }
}
