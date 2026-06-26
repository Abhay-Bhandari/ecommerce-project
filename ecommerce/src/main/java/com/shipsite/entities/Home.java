package com.shipsite.entities;

import java.util.List;

import lombok.Data;

@Data
public class Home {

  private List<HomeCategory> grid;

  private List<HomeCategory> shopByCategories;

  private List<HomeCategory> dealCategories;

  private List<HomeCategory> electricCategories;

  private List<Deal> deals;
}
