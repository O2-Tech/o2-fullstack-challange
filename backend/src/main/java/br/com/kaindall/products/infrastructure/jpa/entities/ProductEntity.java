package br.com.kaindall.products.infrastructure.jpa.entities;


import br.com.kaindall.products.domain.models.Category;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.BigInteger;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="products")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long product_id;

    @Column(nullable = false)
    private String name;

    private String description;

    @ManyToOne
    @JoinColumn(name="id_category")
    private Category category;

    private BigDecimal price;
}
