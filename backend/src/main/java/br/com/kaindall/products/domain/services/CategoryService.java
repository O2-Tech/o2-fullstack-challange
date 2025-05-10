package br.com.kaindall.products.domain.services;

import br.com.kaindall.products.domain.gateways.CategoryGateway;
import br.com.kaindall.products.domain.models.Category;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
    private final CategoryGateway categoryGateway;

    public CategoryService(CategoryGateway categoryGateway) {
        this.categoryGateway = categoryGateway;
    }

    boolean create(String name, String description) {
        return categoryGateway.save(name, description);
    }

    boolean update(String name, String description) {
        return categoryGateway.save(name, description);
    }

    Category retrieve(Long categoryId) {
        return categoryGateway.find(categoryId);
    }

    boolean remove(Long categoryId) {
        return categoryGateway.delete(categoryId);
    }
}
