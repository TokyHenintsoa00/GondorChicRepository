package itu.BackendGondorChic.client.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import itu.BackendGondorChic.client.dto.AuthResponse;
import itu.BackendGondorChic.client.dto.ClientLoginRequest;
import itu.BackendGondorChic.client.dto.ClientRegistrationRequest;
import itu.BackendGondorChic.client.dto.ClientResponse;
import itu.BackendGondorChic.client.entity.Client;
import itu.BackendGondorChic.client.repository.ClientRepository;
import itu.BackendGondorChic.security.JwtService;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Transactional
    public ClientResponse register(ClientRegistrationRequest request) {
        if (clientRepository.existsByPseudo(request.getPseudo())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ce pseudo est déjà utilisé");
        }

        if (clientRepository.existsByNumeroClient(request.getNumeroClient())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Ce numéro client est déjà utilisé");
        }

        Client client = new Client();
        client.setNumeroClient(request.getNumeroClient());
        client.setNom(request.getNom());
        client.setPrenom(request.getPrenom());
        client.setPseudo(request.getPseudo());
        client.setMdp(passwordEncoder.encode(request.getMdp()));
        client.setAdresseLivraison(request.getAdresseLivraison());
        client.setAdresseFacturation(request.getAdresseFacturation());

        return toResponse(clientRepository.save(client));
    }

    @Transactional(readOnly = true)
    public AuthResponse login(ClientLoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getPseudo(), request.getMdp())
        );

        Client client = clientRepository.findByPseudo(request.getPseudo())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Pseudo ou mot de passe invalide"));

        String token = jwtService.generateToken(client.getPseudo());
        return new AuthResponse(token, toResponse(client));
    }

    @Transactional(readOnly = true)
    public ClientResponse getByPseudo(String pseudo) {
        Client client = clientRepository.findByPseudo(pseudo)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Client introuvable"));

        return toResponse(client);
    }

    private ClientResponse toResponse(Client client) {
        return new ClientResponse(
            client.getId() == null ? null : client.getId().longValue(),
                client.getNumeroClient(),
                client.getNom(),
                client.getPrenom(),
                client.getPseudo(),
                client.getAdresseLivraison(),
                client.getAdresseFacturation()
        );
    }
}