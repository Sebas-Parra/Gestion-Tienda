package com.example.products.services;

import com.example.products.client.CategoryClient;
import com.example.products.models.entities.Product;
import com.example.products.repositories.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;
    private final CategoryClient categoryClient;

    public ProductServiceImpl(ProductRepository productRepository, CategoryClient categoryClient){
        this.productRepository = productRepository;
        this.categoryClient = categoryClient;
    }

    @Override
    public List<Product> getAllProducts() {
        return  (List<Product>) productRepository.findAll();
    }

    @Override
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }


    @Override
    public Product createProduct(Product product) {
        validateCategory(product.getCategoryId());
        return productRepository.save(product);
    }

    /*@Override
    public Product updateProduct(long id, Product product) {
        if(!productRepository.existsById(id)){
            throw new IllegalArgumentException("Product with id " + id + " does not exist.");
        } else {
            product.setId(id);
            return productRepository.save(product);
        }
    }*/

    @Override
    public Product updateProduct(Long id, Product product) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        // valida si cambia categoryId (o siempre, como prefieras)
        validateCategory(product.getCategoryId());

        existing.setName(product.getName());
        existing.setDescription(product.getDescription());
        existing.setPrice(product.getPrice());
        existing.setCategoryId(product.getCategoryId());
        return productRepository.save(existing);
    }

    @Override
    public void deleteProduct(Long id) {
        if(!productRepository.existsById(id)){
            throw new IllegalArgumentException("Product with id " + id + " does not exist.");
        } else {
            productRepository.deleteById(id);
        }
    }


    private void validateCategory(Long categoryId) {
    if (categoryId == null || !categoryClient.exists(categoryId)) {
        throw new IllegalArgumentException("Category does not exist: " + categoryId);
    }
    }

    @Override
    public List<Product> getByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

}