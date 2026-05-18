package itu.BackendGondorChic.client.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Data
@NoArgsConstructor
public class ClientRegistrationRequest {

    @NotBlank
    @Pattern(regexp = "^[0-9]{10}$", message = "Le numero_client doit contenir exactement 10 chiffres")
    private String numeroClient;

    @NotBlank
    @Size(max = 100)
    private String nom;

    @NotBlank
    @Size(max = 100)
    private String prenom;

    @NotBlank
    @Size(max = 50)
    private String pseudo;

    @NotBlank
    @Size(min = 8, max = 100)
    private String mdp;

    @Size(max = 255)
    private String adresseLivraison;

    @Size(max = 255)
    private String adresseFacturation;

}