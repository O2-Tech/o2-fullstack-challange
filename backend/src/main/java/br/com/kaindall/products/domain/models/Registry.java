package br.com.kaindall.products.domain.models;

import br.com.kaindall.products.domain.utils.enums.RegistryTypes;

import java.time.LocalDateTime;

public record Registry(
        Long id,
        Long productId,
        RegistryTypes type,
        int quantity,
        LocalDateTime date
) {
}
