package com.shipsite.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.shipsite.entities.Home;
import com.shipsite.entities.HomeCategory;
import com.shipsite.service.HomeCategoryService;
import com.shipsite.service.HomeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CustomerController {

  private final HomeCategoryService homeCategoryService;
  private final HomeService homeService;

  @PostMapping("/home/categories")
  public ResponseEntity<Home> createHomeCategories(@RequestBody List<HomeCategory> homeCategories) {
    List<HomeCategory> categories = homeCategoryService.createCategories(homeCategories);
    Home home = homeService.createHomePageData(categories);
    return new ResponseEntity<>(home, HttpStatus.ACCEPTED);
  }

}
