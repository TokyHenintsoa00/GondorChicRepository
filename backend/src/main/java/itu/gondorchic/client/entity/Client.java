package itu.gondorchic.client.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "client")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "numero_client", nullable = false, length = 10)
    private String numeroClient;

    @Column(name = "nom", nullable = false, length = 100)
    private String nom;

    @Column(name = "prenom", nullable = false, length = 100)
    private String prenom;

    @Column(name = "pseudo", nullable = false, length = 50)
    private String pseudo;

    @Column(name = "mdp", nullable = false, length = 255)
    private String mdp;

    @Column(name = "adresse_livraison", length = 255)
    private String adresseLivraison;

    @Column(name = "adresse_facturation", length = 255)
    private String adresseFacturation;
}
