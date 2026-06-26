package com.shipsite.service;

import java.util.List;

import com.shipsite.entities.Home;
import com.shipsite.entities.HomeCategory;

public interface HomeService {

  public Home createHomePageData(List<HomeCategory> allCategories);
  
}
