package br.com.kaindall.products.infrastructure.adapters;

import br.com.kaindall.products.domain.gateways.CategoryGateway;
import br.com.kaindall.products.domain.models.Category;
import br.com.kaindall.products.infrastructure.adapters.mappers.CategoryEntityMapper;
import br.com.kaindall.products.infrastructure.jpa.entities.CategoryEntity;
import br.com.kaindall.products.infrastructure.jpa.repositories.CategoryRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

public class CategoryAdapter implements CategoryGateway {
    private final CategoryRepository categoryRepository;
    private final CategoryEntityMapper categoryMapper;

    public CategoryAdapter(CategoryRepository categoryRepository, CategoryEntityMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public boolean save(Category category) {
        return categoryRepository.save(category) != null;
    }

    @Override
    public Category find(Long id) {
        return categoryMapper.toDomain(categoryRepository.findById(id).get());
    }

    @Override
    public boolean delete(Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return true;
        }
        throw new NoSuchElementException();
    }

    @Override
    public List<Category> findAll() {
        List<CategoryEntity> categoryEntities = new ArrayList<>();
        categoryRepository.findAll().forEach(categoryEntities::add);
        return categoryEntities
                .stream()
                .map(categoryMapper::toDomain)
                .toList();
    }

    @Override
    public Category findByName(String name) {
        return categoryMapper.toDomain((categoryRepository.findByName(name)));
    }
}
