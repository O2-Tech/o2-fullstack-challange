package br.com.kaindall.products.infrastructure.adapters;

import br.com.kaindall.products.domain.gateways.CategoryGateway;
import br.com.kaindall.products.domain.models.Category;

public class CategoryAdapter implements CategoryGateway {
    @Override
    public boolean save(String name, String description) {
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
}
