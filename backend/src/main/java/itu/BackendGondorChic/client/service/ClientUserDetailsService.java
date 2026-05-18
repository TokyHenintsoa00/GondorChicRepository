package itu.BackendGondorChic.client.service;

import java.util.Collections;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import itu.BackendGondorChic.client.repository.ClientRepository;

@Service
@RequiredArgsConstructor
public class ClientUserDetailsService implements UserDetailsService {

    private final ClientRepository clientRepository;

    @Override
    public UserDetails loadUserByUsername(String pseudo) throws UsernameNotFoundException {
        itu.BackendGondorChic.client.entity.Client client = clientRepository.findByPseudo(pseudo)
                .orElseThrow(() -> new UsernameNotFoundException("Client introuvable: " + pseudo));

        return new User(
                client.getPseudo(),
                client.getMdp(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_CLIENT"))
        );
    }
}