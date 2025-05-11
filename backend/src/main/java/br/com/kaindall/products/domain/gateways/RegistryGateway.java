package br.com.kaindall.products.domain.gateways;

import br.com.kaindall.products.domain.models.Registry;

public interface RegistryGateway {
    boolean save(Registry registry);
}
