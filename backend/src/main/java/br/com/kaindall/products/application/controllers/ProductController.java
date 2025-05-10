package br.com.kaindall.products.application.controllers;

import br.com.kaindall.products.application.dtos.requests.CreateProductDTO;
import br.com.kaindall.products.application.dtos.requests.UpdateProductDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController("/products")
public class ProductController {

    @PostMapping("/")
    public ResponseEntity<Void> createProduct(@RequestBody CreateProductDTO product) {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id_product}")
    public ResponseEntity<Void> addProduct(
            @PathVariable Long id,
            @RequestParam int quantity) {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id_product}")
    public ResponseEntity<Void> retrieveProduct(@PathVariable Long id) {
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id_product}")
    public ResponseEntity<Void> updateProduct(
            @PathVariable Long id,
            @RequestBody UpdateProductDTO product) {
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id_product}")
    public ResponseEntity<Void> decreaseProduct(
            @PathVariable Long id,
            @RequestParam int quantity) {
        return ResponseEntity.ok().build();
    }
}
