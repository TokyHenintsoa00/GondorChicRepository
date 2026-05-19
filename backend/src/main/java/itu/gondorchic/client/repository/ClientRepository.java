package itu.gondorchic.client.repository;

import itu.gondorchic.client.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Integer> {

    Optional<Client> findByPseudo(String pseudo);

    Optional<Client> findByNumeroClient(String numeroClient);

    boolean existsByPseudo(String pseudo);

    boolean existsByNumeroClient(String numeroClient);
}
