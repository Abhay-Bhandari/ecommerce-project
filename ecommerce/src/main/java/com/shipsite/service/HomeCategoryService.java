package com.shipsite.service;

import java.util.List;

import com.shipsite.entities.HomeCategory;

public interface HomeCategoryService {
  HomeCategory createHomeCategory(HomeCategory homeCategory);

  List<HomeCategory> createCategories(List<HomeCategory> homeCategory);

  List<HomeCategory> getAllHomeCategories();

  HomeCategory updateHomeCategory(HomeCategory homeCategory, Long id);
}
