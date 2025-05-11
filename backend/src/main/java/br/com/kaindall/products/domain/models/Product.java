package br.com.kaindall.products.domain.models;

import java.math.BigDecimal;
import java.math.BigInteger;

public record Product(
        Long id,
        String name,
        String description,
        Category category,
        BigDecimal price,
        int quantity
) {
}
