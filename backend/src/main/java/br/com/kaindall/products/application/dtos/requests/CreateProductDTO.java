package br.com.kaindall.products.application.dtos.requests;

import java.math.BigDecimal;
import java.math.BigInteger;

public record CreateProductDTO(
        String name,
        String description,
        BigInteger categoryId,
        BigDecimal price
) {
}
