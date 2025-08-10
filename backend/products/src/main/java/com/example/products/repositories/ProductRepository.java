package com.example.products.repositories;

import org.springframework.data.repository.CrudRepository;

import com.example.products.models.entities.Product;

import java.util.List;

public interface ProductRepository extends CrudRepository<Product,Long> {
    List<Product> findByCategoryId(Long categoryId);

}
