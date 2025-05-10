package br.com.kaindall.products.infrastructure.jpa.repositories;

import br.com.kaindall.products.infrastructure.jpa.entities.ProductEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<ProductEntity, Long> {
}
