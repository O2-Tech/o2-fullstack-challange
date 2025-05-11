package br.com.kaindall.products.infrastructure.jpa.repositories;

import br.com.kaindall.products.domain.models.Product;
import br.com.kaindall.products.infrastructure.jpa.entities.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    ProductEntity save(Product product);
}
