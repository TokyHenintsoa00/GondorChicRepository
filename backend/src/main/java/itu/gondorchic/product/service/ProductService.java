package itu.gondorchic.product.service;

import java.util.List;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import itu.gondorchic.product.dto.ProductResponse;
import itu.gondorchic.product.entity.Product;
import itu.gondorchic.product.repository.ProductRepository;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<ProductResponse> findAll() {
        return productRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getReferenceProduit(),
                product.getLibelle(),
                product.getDescription(),
                product.getPrixDuJour(),
                product.getQuantiteEnStock(),
                product.getEstDuJour(),
                product.getImage(),
                product.getCategorie() == null ? null : product.getCategorie().getId()
        );
    }
}