package itu.gondorchic.client.service;

import itu.gondorchic.client.dto.AuthResponse;
import itu.gondorchic.client.dto.ClientLoginRequest;
import itu.gondorchic.client.dto.ClientResponse;
import itu.gondorchic.client.entity.Client;
import itu.gondorchic.client.repository.ClientRepository;
import itu.gondorchic.exception.NotFoundException;
import itu.gondorchic.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Transactional(readOnly = true)
    public AuthResponse login(ClientLoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getPseudo(), request.getMdp())
        );

        Client client = clientRepository.findByPseudo(request.getPseudo())
                .orElseThrow(() -> new NotFoundException("Client introuvable"));

        String token = jwtService.generateToken(client.getPseudo());
        return new AuthResponse(token, toResponse(client));
    }

    @Transactional(readOnly = true)
    public ClientResponse getByPseudo(String pseudo) {
        Client client = clientRepository.findByPseudo(pseudo)
                .orElseThrow(() -> new NotFoundException("Client introuvable"));
        return toResponse(client);
    }

    private ClientResponse toResponse(Client client) {
        return new ClientResponse(
                client.getId(),
                client.getNumeroClient(),
                client.getNom(),
                client.getPrenom(),
                client.getPseudo(),
                client.getAdresseLivraison(),
                client.getAdresseFacturation()
        );
    }
}
