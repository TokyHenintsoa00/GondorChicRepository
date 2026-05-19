package itu.gondorchic.security;

import itu.gondorchic.client.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientUserDetailsService implements UserDetailsService {

    private final ClientRepository clientRepository;

    @Override
    public UserDetails loadUserByUsername(String pseudo) throws UsernameNotFoundException {
        itu.gondorchic.client.entity.Client client = clientRepository.findByPseudo(pseudo)
                .orElseThrow(() -> new UsernameNotFoundException("Client introuvable: " + pseudo));

        return new User(
                client.getPseudo(),
                client.getMdp(),
                List.of(new SimpleGrantedAuthority("ROLE_CLIENT"))
        );
    }
}
