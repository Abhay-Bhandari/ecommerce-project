package com.shipsite.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shipsite.entities.HomeCategory;
import com.shipsite.repository.HomeCategoryRepository;
import com.shipsite.service.HomeCategoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeCategoryImpl implements HomeCategoryService {

  private final HomeCategoryRepository homeCategoryRepository;

  @Override
  public HomeCategory createHomeCategory(HomeCategory homeCategory) {
    return homeCategoryRepository.save(homeCategory);
  }

  @Override
  public List<HomeCategory> createCategories(List<HomeCategory> homeCategory) {
    if (homeCategoryRepository.findAll().isEmpty()) {
      return homeCategoryRepository.saveAll(homeCategory);
    }
    return homeCategoryRepository.findAll();
  }

  @Override
  public List<HomeCategory> getAllHomeCategories() {
    return homeCategoryRepository.findAll();

  }

  @Override
  public HomeCategory updateHomeCategory(HomeCategory category, Long id) {
    HomeCategory existingCategory = homeCategoryRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Category not found"));

    if (category.getImage() != null) {
      existingCategory.setImage(category.getImage());
    }
    if (category.getCategoryId() != null) {
      existingCategory.setCategoryId(category.getCategoryId());
    }
    return homeCategoryRepository.save(existingCategory);
  }

}
