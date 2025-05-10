package br.com.kaindall.products.application.controllers;

import br.com.kaindall.products.application.dtos.requests.CreateProductDTO;
import br.com.kaindall.products.application.dtos.requests.UpdateProductDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;

@RestController("/products")
public class ProductController {

    @PostMapping("/")
    public ResponseEntity<Void> createProduct(@RequestBody CreateProductDTO product) {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id_product}")
    public ResponseEntity<Void> addProduct(
            @PathVariable BigInteger id,
            @RequestParam int quantity) {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id_product}")
    public ResponseEntity<Void> retrieveProduct(@PathVariable BigInteger id) {
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id_product}")
    public ResponseEntity<Void> updateProduct(
            @PathVariable BigInteger id,
            @RequestBody UpdateProductDTO product) {
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id_product}")
    public ResponseEntity<Void> decreaseProduct(
            @PathVariable BigInteger id,
            @RequestParam int quantity) {
        return ResponseEntity.ok().build();
    }
}
