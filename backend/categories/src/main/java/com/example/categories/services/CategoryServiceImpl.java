package com.example.categories.services;

import com.example.categories.models.entities.Category;
import com.example.categories.repositories.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import com.example.categories.repositories.CategoryRepository;


import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoryServiceImpl implements  CategoryService{

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories() {
        return (List<Category>) categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long id, Category category) {
        if(!categoryRepository.findById(id).isPresent()){
            throw new IllegalArgumentException("Category with id " + id + " does not exist.");
        }
            category.setId(id);
            return categoryRepository.save(category);

    }

    @Override
    public void deleteCategory(Long id) {
        if(!categoryRepository.findById(id).isPresent()){
            throw new IllegalArgumentException("Category with id " + id + " does not exist.");
        }
        categoryRepository.deleteById(id);
    }
}
