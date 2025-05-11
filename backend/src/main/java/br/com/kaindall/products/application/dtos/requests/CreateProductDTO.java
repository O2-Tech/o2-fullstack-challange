package br.com.kaindall.products.application.dtos.requests;

import br.com.kaindall.products.domain.models.Category;

import java.math.BigDecimal;
import java.math.BigInteger;

public record CreateProductDTO(
        String name,
        String description,
        String categoryName,
        BigDecimal price,
        int quantity
) {
}
