package br.com.kaindall.products.infrastructure.adapters.mappers;

import br.com.kaindall.products.domain.models.Category;
import br.com.kaindall.products.infrastructure.jpa.entities.CategoryEntity;

public class CategoryEntityMapper {
    public Category toDomain(CategoryEntity category) {
        return new Category(
                category.getId(),
                category.getName(),
                category.getDescription());
    }
}
