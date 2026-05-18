package itu.BackendGondorChic.client.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

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