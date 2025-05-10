package br.com.kaindall.products.domain.models;

import br.com.kaindall.products.domain.enums.RegistryTypes;

import java.util.Date;

public record Registry(
        Long id,
        Product product,
        RegistryTypes type,
        Date date
) {
}
