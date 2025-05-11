package br.com.kaindall.products.infrastructure.adapters.mappers;

import br.com.kaindall.products.domain.models.Category;
import br.com.kaindall.products.infrastructure.jpa.entities.CategoryEntity;
import org.springframework.stereotype.Component;

@Component
public class CategoryEntityMapper {

    public Category toDomain(CategoryEntity category) {
        return new Category(
                category.getId(),
                category.getName(),
                category.getDescription());
    }
}
