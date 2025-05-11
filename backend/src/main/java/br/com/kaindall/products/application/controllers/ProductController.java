package br.com.kaindall.products.application.controllers;

import br.com.kaindall.products.application.dtos.requests.CreateProductDTO;
import br.com.kaindall.products.application.dtos.requests.UpdateProductDTO;
import br.com.kaindall.products.application.dtos.responses.ProductDTO;
import br.com.kaindall.products.application.mappers.ProductMapper;
import br.com.kaindall.products.domain.facades.ProductFacade;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@Tag(name = "Produtos", description = "Operações acerca do produto")
public class ProductController {
    private final ProductFacade productFacade;
    private final ProductMapper productMapper;

    public ProductController(ProductFacade productFacade, ProductMapper productMapper) {
        this.productFacade = productFacade;
        this.productMapper = productMapper;
    }

    @Operation(
            operationId = "cadastrarProduto",
            summary = "Registra um novo tipo de produto"
    )
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

    @Operation(
            operationId = "buscarProdutos",
            summary = "Retorna uma lista de produtos. Utiliza paginação"
    )
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

    @Operation(
            operationId = "adicionarProdutos",
            summary = "Incrementa uma quantidade de produtos no estoque"
    )
    @PostMapping("/{id_product}")
    public ResponseEntity<Void> addProduct(
            @Parameter(name="id_product", description="Identificador do produto-alvo")
            @PathVariable Long id,
            @RequestParam int quantity) {
        productFacade.increment(id, quantity);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(
            operationId = "buscarProduto",
            summary = "Retorna informações de um produto específico"
    )
    @GetMapping("/{id_product}")
    public ResponseEntity<ProductDTO> retrieveProduct(
            @Parameter(name="id_product", description="Identificador do produto-alvo")
            @PathVariable Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(productMapper.toDTO(productFacade.find(id)));
    }

    @Operation(
            operationId = "atualizarProduto",
            summary = "Edita informações de um produto específico"
    )
    @PatchMapping("/{id_product}")
    public ResponseEntity<Void> updateProduct(
            @Parameter(name="id_product", description="Identificador do produto-alvo")
            @PathVariable Long id,
            @RequestBody UpdateProductDTO product) {
        productFacade.save(productMapper.toDomain(product, id, productFacade.findCategory(product.categoryName())));
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @Operation(
            operationId = "retirarProduto",
            summary = "Remove um produto do estoque"
    )
    @DeleteMapping("/{id_product}")
    public ResponseEntity<Void> decreaseProduct(
            @Parameter(name="id_product", description="Identificador do produto-alvo")
            @PathVariable Long id,
            @RequestParam int quantity,
            @Parameter(
                    name="delete",
                    description="Se true, removerá o produto do estoque e suas informações, mas não seu historico")
            @RequestParam(defaultValue = "false") boolean delete) {
        if (delete) {
            productFacade.remove(id);
        }
        productFacade.decrease(id, quantity);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
