package br.com.kaindall.products.infrastructure.adapters;

import br.com.kaindall.products.domain.gateways.CategoryGateway;
import br.com.kaindall.products.domain.models.Category;
import br.com.kaindall.products.infrastructure.jpa.repositories.CategoryRepository;

import java.util.List;

public class CategoryAdapter implements CategoryGateway {
    private final CategoryRepository categoryRepository;

    public CategoryAdapter(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public boolean save(Category category) {
        return false;
    }

    @Override
    public Category find(Long id) {
        return null;
    }

    @Override
    public boolean delete(Long categoryId) {
        return false;
    }

    @Override
    public List<Category> findAll() {
        return List.of();
    }
}
