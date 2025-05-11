package br.com.kaindall.products.domain.gateways;

import br.com.kaindall.products.domain.models.Product;
import br.com.kaindall.products.domain.models.ProductsPage;

import java.util.List;

public interface ProductGateway {
    Product add(Long id, int quantity);

    Product decrease(Long id, int quantity);

    Product findById(Long id);

    boolean deleteById(Long id);

    List<Product> findAll(ProductsPage productsPage);

    Product save(Product product);
}
