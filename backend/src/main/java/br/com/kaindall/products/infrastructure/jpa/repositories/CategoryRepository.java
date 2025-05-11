package br.com.kaindall.products.infrastructure.jpa.repositories;

import br.com.kaindall.products.domain.models.Category;
import br.com.kaindall.products.infrastructure.jpa.entities.CategoryEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CategoryRepository extends CrudRepository<CategoryEntity, Long> {
    CategoryEntity save(Category category);

    CategoryEntity findByName(String name);
}
