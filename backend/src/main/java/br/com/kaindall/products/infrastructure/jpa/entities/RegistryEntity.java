package br.com.kaindall.products.infrastructure.jpa.entities;

import br.com.kaindall.products.domain.enums.RegistryTypes;
import br.com.kaindall.products.domain.models.Product;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="registries")
public class RegistryEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long registry_id;

    @ManyToOne
    @JoinColumn(name="id_product")
    private Product product;

    private RegistryTypes type;

    @Temporal(TemporalType.DATE)
    private Date date;
}
