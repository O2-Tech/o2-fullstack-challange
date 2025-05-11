package br.com.kaindall.products.application.dtos.requests;

public record UpdateCategoryDTO(
        Long id,
        String name,
        String description
) {
}
