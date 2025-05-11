package br.com.kaindall.products.domain.services;

import br.com.kaindall.products.domain.gateways.ProductGateway;
import br.com.kaindall.products.domain.models.Product;
import br.com.kaindall.products.domain.models.ProductsPage;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductGateway productGateway;

    public ProductService(ProductGateway productGateway) {
        this.productGateway = productGateway;
    }

    public Product find(Long id) {return productGateway.findById(id);}

    public Product add(Long id, int quantity) {return productGateway.add(id, quantity);}

    public Product decrease(Long id, int quantity) {return productGateway.decrease(id, quantity);}

    public void delete(Long id) {productGateway.deleteById(id);}

    public List<Product> findAll(ProductsPage productsPage) {return productGateway.findAll(productsPage);}

    public Product save(Product product) {return productGateway.save(product);}
}
