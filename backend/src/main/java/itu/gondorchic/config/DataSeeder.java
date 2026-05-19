package itu.gondorchic.config;

import itu.gondorchic.client.entity.Client;
import itu.gondorchic.client.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Profile("seed")
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedClient("2600000001", "Sacquet",  "Frodon",   "Leporteur",    "!totoXXS");
        seedClient("2600000002", "Gamegie",  "Sam",      "Lebrave",      "titiXXL");
        seedClient("2600000003", "Took",     "Peregrin", "Pippin",       "tataXS!");
        seedClient("2600000004", "Sauron",   "Mairon",   "Necromancien", "saruXXS!");
    }

    private void seedClient(String numeroClient, String nom, String prenom,
                            String pseudo, String rawPassword) {
        if (clientRepository.existsByPseudo(pseudo)) {
            return;
        }
        Client client = new Client();
        client.setNumeroClient(numeroClient);
        client.setNom(nom);
        client.setPrenom(prenom);
        client.setPseudo(pseudo);
        client.setMdp(passwordEncoder.encode(rawPassword));
        clientRepository.save(client);
    }
}
