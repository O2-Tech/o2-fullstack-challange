package br.com.kaindall.products.domain.gateways;

import br.com.kaindall.products.domain.models.Category;

public interface CategoryGateway {
    boolean save(String name, String description);
    Category find(Long id);
    boolean delete(Long categoryId);
}
