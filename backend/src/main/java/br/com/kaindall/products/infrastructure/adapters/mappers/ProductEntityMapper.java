package br.com.kaindall.products.infrastructure.adapters.mappers;

import br.com.kaindall.products.domain.models.Product;
import br.com.kaindall.products.infrastructure.jpa.entities.ProductEntity;
import org.springframework.stereotype.Component;

@Component
public class ProductEntityMapper {
    private final CategoryEntityMapper categoryMapper;

    public ProductEntityMapper(CategoryEntityMapper categoryMapper) {
        this.categoryMapper = categoryMapper;
    }

    public Product toDomain(ProductEntity product) {
        return new Product(
                product.getId(),
                product.getName(),
                product.getDescription(),
                categoryMapper.toDomain(product.getCategory()),
                product.getPrice(),
                product.getQuantity()
        );
    }
}
