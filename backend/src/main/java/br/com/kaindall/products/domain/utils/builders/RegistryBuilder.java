package br.com.kaindall.products.domain.utils.builders;

import br.com.kaindall.products.domain.utils.enums.RegistryTypes;
import br.com.kaindall.products.domain.models.Registry;

import java.time.LocalDateTime;

public class RegistryBuilder {
    private Long id;
    private Long productId;
    private RegistryTypes type;
    private int quantity;
    private LocalDateTime date;

    public RegistryBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public RegistryBuilder withProductId(Long productId) {
        this.productId = productId;
        return this;
    }

    public RegistryBuilder withType(RegistryTypes type) {
        this.type = type;
        return this;
    }

    public RegistryBuilder withQuantity(int quantity) {
        this.quantity = quantity;
        return this;
    }

    public Registry build() {
        return new Registry(this.id, this.productId, this.type, this.quantity, LocalDateTime.now());
    }
}
