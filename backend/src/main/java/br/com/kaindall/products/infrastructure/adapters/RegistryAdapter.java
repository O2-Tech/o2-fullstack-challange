package br.com.kaindall.products.infrastructure.adapters;

import br.com.kaindall.products.domain.gateways.RegistryGateway;
import br.com.kaindall.products.domain.models.Registry;
import br.com.kaindall.products.infrastructure.jpa.repositories.RegistryRepository;

public class RegistryAdapter implements RegistryGateway {
    private final RegistryRepository registryRepository;

    public RegistryAdapter(RegistryRepository registryRepository) {
        this.registryRepository = registryRepository;
    }

    @Override
    public boolean save(Registry registry) {
        return registryRepository.save(registry) != null;
    }
}
