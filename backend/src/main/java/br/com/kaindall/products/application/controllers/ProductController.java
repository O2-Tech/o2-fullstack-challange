package br.com.kaindall.products.application.controllers;

import br.com.kaindall.products.application.dtos.requests.CreateProductDTO;
import br.com.kaindall.products.application.dtos.requests.UpdateProductDTO;
import br.com.kaindall.products.application.dtos.responses.ProductDTO;
import br.com.kaindall.products.application.mappers.ProductMapper;
import br.com.kaindall.products.domain.facades.ProductFacade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductFacade productFacade;
    private final ProductMapper productMapper;

    public ProductController(ProductFacade productFacade, ProductMapper productMapper) {
        this.productFacade = productFacade;
        this.productMapper = productMapper;
    }

    @PostMapping("")
    public ResponseEntity<Long> createProduct(@RequestBody CreateProductDTO product) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(productFacade.save(productMapper.toDomain(
                        product,
                        productFacade.findCategory(product.categoryName())))
                        .id()
                );
    }

    @GetMapping("")
    public ResponseEntity<List<ProductDTO>> retrieveAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "name") String sort,
            @RequestParam(defaultValue = "true") boolean ascending) {
        List<ProductDTO> products = productFacade
                .batchRetrieve(productMapper.toPagination(page, size, sort, ascending))
                .stream()
                .map(productMapper::toDTO)
                .toList();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(products);
    }

    @PostMapping("/{id_product}")
    public ResponseEntity<Void> addProduct(
            @PathVariable Long id,
            @RequestParam int quantity) {
        productFacade.increment(id, quantity);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/{id_product}")
    public ResponseEntity<ProductDTO> retrieveProduct(@PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(productMapper.toDTO(productFacade.find(id)));
    }

    @PatchMapping("/{id_product}")
    public ResponseEntity<Void> updateProduct(
            @PathVariable Long id,
            @RequestBody UpdateProductDTO product) {
        productFacade.save(productMapper.toDomain(product, id, productFacade.findCategory(product.categoryName())));
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{id_product}")
    public ResponseEntity<Void> decreaseProduct(
            @PathVariable Long id,
            @RequestParam int quantity,
            @RequestParam(defaultValue = "false") boolean delete) {
        if (delete) {
            productFacade.remove(id);
        }
        productFacade.decrease(id, quantity);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
