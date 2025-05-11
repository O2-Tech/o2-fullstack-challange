package br.com.kaindall.products.application.dtos.requests;

import br.com.kaindall.products.domain.models.Category;

import java.math.BigDecimal;

public record UpdateProductDTO(
        String name,
        String description,
        String categoryName,
        BigDecimal price,
        int quantity
) {
}
