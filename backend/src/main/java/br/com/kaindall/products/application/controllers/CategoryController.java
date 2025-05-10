package br.com.kaindall.products.application.controllers;

import br.com.kaindall.products.application.dtos.requests.CreateCategoryDTO;
import br.com.kaindall.products.application.dtos.requests.UpdateProductDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController("/categories")
public class CategoryController {

    @PostMapping("")
    public ResponseEntity<Void> createCategory(@RequestBody CreateCategoryDTO category) {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id_category}")
    public ResponseEntity<Void> retrieveCategory(@PathVariable Long id) {
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id_category}")
    public ResponseEntity<Void> updateCategory(
            @PathVariable Long id,
            @RequestBody UpdateProductDTO product) {
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id_category}")
    public ResponseEntity<Void> deleteCategory(
            @PathVariable Long id) {
        return ResponseEntity.ok().build();
    }
}
