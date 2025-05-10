package br.com.kaindall.products.infrastructure.jpa.repositories;

import br.com.kaindall.products.domain.models.Category;
import br.com.kaindall.products.infrastructure.jpa.entities.CategoryEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends CrudRepository<CategoryEntity, Long> {
    <S extends CategoryEntity> CategoryEntity save(CategoryEntity category);

    boolean existsByName(String name);

    Optional<CategoryEntity> findById(Long id);

    Iterable<CategoryEntity> findAll();

    void deleteById(Long id);
}
