package itu.gondorchic.product.controller;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import itu.gondorchic.common.ApiResponse;
import itu.gondorchic.product.dto.ProductResponse;
import itu.gondorchic.product.service.ProductService;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResponse>>> listProducts() {
        return ResponseEntity.ok(ApiResponse.ok(productService.findAll(), "Liste des produits récupérée"));
    }
}