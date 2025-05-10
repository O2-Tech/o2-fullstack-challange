package br.com.kaindall.products.domain.facades;

import br.com.kaindall.products.domain.services.CategoryService;
import br.com.kaindall.products.domain.services.ProductService;
import br.com.kaindall.products.domain.services.RegistryService;
import org.springframework.stereotype.Component;


@Component
public class ProductFacade {
    private CategoryService categoryService;
    private ProductService productService;
    private RegistryService registryService;

    public ProductFacade(CategoryService categoryService,
                         ProductService productService,
                         RegistryService registryService) {
        this.categoryService = categoryService;
        this.productService = productService;
        this.registryService = registryService;
    }


}
