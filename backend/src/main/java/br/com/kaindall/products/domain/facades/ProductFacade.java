package br.com.kaindall.products.domain.facades;

import br.com.kaindall.products.domain.models.Category;
import br.com.kaindall.products.domain.models.Product;
import br.com.kaindall.products.domain.models.ProductsPage;
import br.com.kaindall.products.domain.services.CategoryService;
import br.com.kaindall.products.domain.services.ProductService;
import br.com.kaindall.products.domain.services.RegistryService;
import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class ProductFacade {
    private final CategoryService categoryService;
    private final ProductService productService;
    private final RegistryService registryService;

    public ProductFacade(CategoryService categoryService, ProductService productService,
                         RegistryService registryService) {
        this.categoryService = categoryService;
        this.productService = productService;
        this.registryService = registryService;
    }

    public List<Product> batchRetrieve(ProductsPage productsPage) {return productService.findAll(productsPage);}

    public Product find(Long id) {return productService.find(id);}

    public Category findCategory(String name) {
        return categoryService.retrieveByName(name);
    }

    public void increment(Long id, int quantity) {
        productService.add(id, quantity);
        registryService.add(id, quantity);
    }

    public void decrease(Long id, int quantity) {
        productService.decrease(id, quantity);
        registryService.decrease(id, quantity);
    }

    public void remove(Long id) {
        Product product = productService.find(id);
        productService.delete(id);
        registryService.decrease(product.id(), product.quantity());
    }

    public Product save(Product product) {
        return productService.save(product);
    }
}
