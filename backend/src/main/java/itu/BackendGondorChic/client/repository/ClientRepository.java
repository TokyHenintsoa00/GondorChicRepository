package itu.BackendGondorChic.client.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import itu.BackendGondorChic.client.entity.Client;

public interface ClientRepository extends JpaRepository<Client, Integer> {

    Optional<Client> findByPseudo(String pseudo);

    Optional<Client> findByNumeroClient(String numeroClient);

    boolean existsByPseudo(String pseudo);

    boolean existsByNumeroClient(String numeroClient);
}