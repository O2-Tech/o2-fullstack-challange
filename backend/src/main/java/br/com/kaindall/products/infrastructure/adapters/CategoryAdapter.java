package br.com.kaindall.products.infrastructure.adapters;

import br.com.kaindall.products.domain.gateways.CategoryGateway;

public class CategoryAdapter implements CategoryGateway {
    public boolean save(String name, String description) {
        return false;
    }
}
