package br.com.kaindall.products.infrastructure.jpa.repositories;

import br.com.kaindall.products.infrastructure.jpa.entities.ProductEntity;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<ProductEntity, Long> {
}
