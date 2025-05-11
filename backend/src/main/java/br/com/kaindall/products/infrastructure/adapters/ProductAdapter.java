package br.com.kaindall.products.infrastructure.adapters;

import br.com.kaindall.products.domain.gateways.ProductGateway;
import br.com.kaindall.products.domain.models.Product;
import br.com.kaindall.products.domain.models.ProductsPage;
import br.com.kaindall.products.infrastructure.adapters.mappers.ProductEntityMapper;
import br.com.kaindall.products.infrastructure.jpa.entities.ProductEntity;
import br.com.kaindall.products.infrastructure.jpa.repositories.ProductRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

public class ProductAdapter implements ProductGateway {
    private final ProductRepository productRepository;
    private final ProductEntityMapper productMapper;

    public ProductAdapter(ProductRepository productRepository, ProductEntityMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Override
    public Product add(Long id, int quantity) {
        ProductEntity product = productRepository.findById(id).get();
        product.setQuantity(product.getQuantity()+quantity);
        return productMapper.toDomain(productRepository.save(product));
    }

    @Override
    public Product decrease(Long id, int quantity) {
        ProductEntity product = productRepository.findById(id).get();
        if (product.getQuantity() < quantity) {
            throw new ArithmeticException("Estoque insuficiente para ser subtraido");
        }
        product.setQuantity(product.getQuantity()-quantity);
        return productMapper.toDomain(productRepository.save(product));
    }

    @Override
    public Product findById(Long id) {
        return productMapper.toDomain(productRepository.findById(id).get());
    }

    @Override
    public boolean deleteById(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        throw new NoSuchElementException();
    }

    @Override
    public List<Product> findAll(ProductsPage productsPage) {
        Sort.Direction direction = productsPage.ascending() ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageableProduct = PageRequest.of(
                productsPage.pageNumber(),
                productsPage.pageNumber()
        ).withSort(direction, String.valueOf(productsPage.sort()));
        return productRepository
                .findAll(pageableProduct)
                .map(productMapper::toDomain)
                .toList();
    }

//    @Override
//    public List<Product> findAll() {
//        List<ProductEntity> productEntities = new ArrayList<>();
//        productRepository.findAll().forEach(productEntities::add);
//        return productEntities
//                .stream()
//                .map(productMapper::toDomain)
//                .toList();
//    }

    @Override
    public Product save(Product product) {
        return productMapper.toDomain(productRepository.save(product));
    }
}
