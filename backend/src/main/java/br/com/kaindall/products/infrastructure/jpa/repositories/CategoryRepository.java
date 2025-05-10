package br.com.kaindall.products.infrastructure.jpa.repositories;

import br.com.kaindall.products.infrastructure.jpa.entities.CategoryEntity;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<CategoryEntity, Long> {
}
