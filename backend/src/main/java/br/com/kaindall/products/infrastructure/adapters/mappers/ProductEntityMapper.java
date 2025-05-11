package br.com.kaindall.products.infrastructure.adapters.mappers;

import br.com.kaindall.products.domain.models.Product;
import br.com.kaindall.products.infrastructure.jpa.entities.ProductEntity;

public class ProductEntityMapper {
    public Product toDomain(ProductEntity product) {
        return new Product(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getCategory(),
                product.getPrice(),
                product.getQuantity()
        );
    }
}
