package br.com.kaindall.products.domain.models;

import br.com.kaindall.products.domain.enums.RegistryTypes;

import java.math.BigInteger;
import java.util.Date;

public record Registry(
        Long registry_id,
        Product product,
        RegistryTypes type,
        Date date
) {
}
