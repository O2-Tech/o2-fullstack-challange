package br.com.kaindall.products.application.mappers;

import br.com.kaindall.products.application.dtos.requests.CreateCategoryDTO;
import br.com.kaindall.products.application.dtos.requests.UpdateCategoryDTO;
import br.com.kaindall.products.application.dtos.responses.CategoryDTO;
import br.com.kaindall.products.domain.models.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
    public Category toDomain(CreateCategoryDTO category) {
        return new Category(null, category.name(), category.description());
    }
    public Category toDomain(Long id, UpdateCategoryDTO category) {
        return new Category(id, category.name(), category.description());
    }
    public CategoryDTO toDTO(Category category) {
        return new CategoryDTO(category.id(), category.name(), category.description());
    }
}
