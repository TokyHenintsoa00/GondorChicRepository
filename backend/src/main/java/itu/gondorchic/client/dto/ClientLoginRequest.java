package itu.gondorchic.client.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ClientLoginRequest {

    @NotBlank
    @Size(max = 50)
    private String pseudo;

    @NotBlank
    @Size(min = 8, max = 100)
    private String mdp;
}
