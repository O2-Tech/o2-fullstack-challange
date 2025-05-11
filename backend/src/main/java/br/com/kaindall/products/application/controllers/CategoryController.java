package br.com.kaindall.products.application.controllers;

import br.com.kaindall.products.application.dtos.requests.CreateCategoryDTO;
import br.com.kaindall.products.application.dtos.requests.UpdateCategoryDTO;
import br.com.kaindall.products.application.dtos.responses.CategoryDTO;
import br.com.kaindall.products.application.mappers.CategoryMapper;
import br.com.kaindall.products.domain.services.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/categories")
@Tag(name = "Categorias", description = "Operações acerca das categorias de produto")
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    public CategoryController(CategoryService categoryService, CategoryMapper categoryMapper) {
        this.categoryService = categoryService;
        this.categoryMapper = categoryMapper;
    }

    @Operation(
            operationId = "criarCategoria",
            summary = "Cria uma nova categoria de produto"
    )
    @PostMapping("")
    public ResponseEntity<Long> createCategory(@RequestBody CreateCategoryDTO category) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(categoryService.create(categoryMapper.toDomain(category)).id());
    }

    @Operation(
            operationId = "buscarCategorias",
            summary = "Retorna todas as categorias disponiveis"
    )
    @GetMapping("")
    public ResponseEntity<List<CategoryDTO>> retrieveAllCategories() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(categoryService
                        .retrieveAll()
                        .stream()
                        .map(categoryMapper::toDTO)
                        .toList());
    }

    @Operation(
            operationId = "buscarCategoria",
            summary = "Busca uma categoria específica"
    )
    @GetMapping("/{id_category}")
    public ResponseEntity<CategoryDTO> retrieveCategory(
            @Parameter(description="Identificador da categoria-alvo")
            @PathVariable(name="id_category") Long id) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(categoryMapper.toDTO(categoryService.retrieve(id)));
    }

    @Operation(
            operationId = "editarCategoria",
            summary = "Atualiza dados de uma categoria específica"
    )
    @PatchMapping("/{id_category}")
    public ResponseEntity<Void> updateCategory(
            @Parameter(description="Identificador da categoria-alvo")
            @PathVariable(name="id_category") Long id,
            @RequestBody UpdateCategoryDTO category) {
        categoryService.update(categoryMapper.toDomain(id, category));
        return ResponseEntity.ok().build();
    }

    @Operation(
            operationId = "excluirCategoria",
            summary = "Exclui uma categoria"
    )
    @DeleteMapping("/{id_category}")
    public ResponseEntity<Void> deleteCategory(
            @Parameter(description="Identificador da categoria-alvo")
            @PathVariable(name="id_category") Long id) {
        categoryService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
