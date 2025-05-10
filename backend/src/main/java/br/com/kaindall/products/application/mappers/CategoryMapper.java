package br.com.kaindall.products.application.mappers;

import br.com.kaindall.products.application.dtos.requests.CreateCategoryDTO;
import br.com.kaindall.products.application.dtos.requests.UpdateCategoryDTO;
import br.com.kaindall.products.application.dtos.responses.CategoryDTO;
import br.com.kaindall.products.domain.models.Category;

public class CategoryMapper {
    public Category toDomain(CreateCategoryDTO category) {
        return new Category(null, category.name(), category.description());
    }
    public Category toDomain(UpdateCategoryDTO category) {return null;}
    public CategoryDTO toDTO(Category category) {
        return new CategoryDTO(category.id(), category.name(), category.description());
    }
}
