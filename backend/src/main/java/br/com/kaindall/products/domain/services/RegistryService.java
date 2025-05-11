package br.com.kaindall.products.domain.services;

import br.com.kaindall.products.domain.utils.enums.RegistryTypes;
import br.com.kaindall.products.domain.gateways.RegistryGateway;
import br.com.kaindall.products.domain.models.Registry;
import br.com.kaindall.products.domain.utils.builders.RegistryBuilder;
import org.springframework.stereotype.Service;

@Service
public class RegistryService {
    private final RegistryGateway registryGateway;

    public RegistryService(RegistryGateway registryGateway) {
        this.registryGateway = registryGateway;
    }

    public void add(Long productId, int quantity) {
        Registry registry = new RegistryBuilder()
                .withProductId(productId)
                .withType(RegistryTypes.IN)
                .withQuantity(quantity)
                .build();
        registryGateway.save(registry);
    }

    public void decrease(Long productId, int quantity) {
        Registry registry = new RegistryBuilder()
                .withProductId(productId)
                .withType(RegistryTypes.OUT)
                .withQuantity(quantity)
                .build();
        registryGateway.save(registry);
    }
}
