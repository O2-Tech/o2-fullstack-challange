package br.com.kaindall.products.domain.models;

import java.math.BigInteger;

public record Category(
        Long id_category,
        String name,
        String description
) {
}
