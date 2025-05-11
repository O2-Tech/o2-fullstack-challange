package br.com.kaindall.products.application.dtos.responses;

import br.com.kaindall.products.domain.models.Category;

import java.math.BigDecimal;

public record ProductDTO(
        Long id,
        String name,
        String description,
        String category,
        BigDecimal price,
        int quantity
) {
}
