package br.com.kaindall.products.application.controllers;

import br.com.kaindall.products.application.dtos.requests.CreateCategoryDTO;
import br.com.kaindall.products.application.dtos.requests.UpdateCategoryDTO;
import br.com.kaindall.products.application.dtos.requests.UpdateProductDTO;
import br.com.kaindall.products.application.dtos.responses.CategoryDTO;
import br.com.kaindall.products.application.mappers.CategoryMapper;
import br.com.kaindall.products.domain.services.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("/categories")
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    public CategoryController(CategoryService categoryService, CategoryMapper categoryMapper) {
        this.categoryService = categoryService;
        this.categoryMapper = categoryMapper;
    }

    @PostMapping("")
    public ResponseEntity<Void> createCategory(@RequestBody CreateCategoryDTO category) {
        if (categoryService.create(categoryMapper.toDomain(category))) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        };
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/")
    public ResponseEntity<List<CategoryDTO>> retrieveAllCategories() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(categoryService
                        .retrieveAll()
                        .stream()
                        .map(categoryMapper::toDTO)
                        .toList());
    }

    @GetMapping("/{id_category}")
    public ResponseEntity<CategoryDTO> retrieveCategory(@PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(categoryMapper.toDTO(categoryService.retrieve(id)));
    }

    @PatchMapping("/{id_category}")
    public ResponseEntity<Void> updateCategory(
            @PathVariable Long id,
            @RequestBody UpdateCategoryDTO category) {
        categoryService.update(categoryMapper.toDomain(id, category));
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id_category}")
    public ResponseEntity<Void> deleteCategory(
            @PathVariable Long id) {
        categoryService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
