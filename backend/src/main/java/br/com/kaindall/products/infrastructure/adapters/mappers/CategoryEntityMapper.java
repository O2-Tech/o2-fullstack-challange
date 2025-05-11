package br.com.kaindall.products.infrastructure.adapters.mappers;

import br.com.kaindall.products.domain.models.Category;
import br.com.kaindall.products.infrastructure.jpa.entities.CategoryEntity;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;

@Component
public class CategoryEntityMapper {
    public CategoryEntity toEntity(Category category) {
        return new CategoryEntity(
                category.id(),
                category.name(),
                category.description()
        );
    }

    public CategoryEntity toEntity (CategoryEntity target, Category source) {
        Field[] sourceAttributes = source.getClass().getDeclaredFields();
        for (Field attribute : sourceAttributes) {
            try {
                attribute.setAccessible(true);
                Object value = attribute.get(source);
                if (value != null) {
                    Field targetAttr = target.getClass().getDeclaredField(attribute.getName());
                    targetAttr.setAccessible(true);
                    targetAttr.set(target, value);
                }
            } catch (NoSuchFieldException | IllegalAccessException e) {
                System.out.println(e);
            }
        }
        return target;
    }

    public Category toDomain(CategoryEntity category) {
        return new Category(
                category.getId(),
                category.getName(),
                category.getDescription());
    }
}
