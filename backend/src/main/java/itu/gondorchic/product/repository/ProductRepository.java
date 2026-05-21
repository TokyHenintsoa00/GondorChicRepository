package itu.gondorchic.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import itu.gondorchic.product.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}