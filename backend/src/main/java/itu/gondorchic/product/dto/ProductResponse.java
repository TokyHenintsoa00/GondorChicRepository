package itu.gondorchic.product.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {

    private Integer id;
    private String referenceProduit;
    private String libelle;
    private String description;
    private BigDecimal prixDuJour;
    private Integer quantiteEnStock;
    private Boolean estDuJour;
    private String image;
    private Integer categorieId;
}