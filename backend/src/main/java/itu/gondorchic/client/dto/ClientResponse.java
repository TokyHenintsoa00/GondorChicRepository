package itu.gondorchic.client.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClientResponse {

    private Integer id;
    private String numeroClient;
    private String nom;
    private String prenom;
    private String pseudo;
    private String adresseLivraison;
    private String adresseFacturation;
}
