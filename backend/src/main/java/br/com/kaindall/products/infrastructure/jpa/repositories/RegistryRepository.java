package br.com.kaindall.products.infrastructure.jpa.repositories;

import br.com.kaindall.products.infrastructure.jpa.entities.RegistryEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistryRepository extends CrudRepository<RegistryEntity, Long> {
}
