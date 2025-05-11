package br.com.kaindall.products.domain.models;

public record ProductsPage(
        int pageNumber,
        int pageSize,
        String sort,
        boolean ascending
) {
}
