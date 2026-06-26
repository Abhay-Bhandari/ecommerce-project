package com.shipsite.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shipsite.entities.Deal;
import com.shipsite.entities.HomeCategory;
import com.shipsite.repository.DealRepository;
import com.shipsite.repository.HomeCategoryRepository;
import com.shipsite.service.DealService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DealServiceImpl implements DealService {

  private final DealRepository dealRepository;
  private final HomeCategoryRepository homeCategoryRepository;

  @Override
  public List<Deal> getDeals() {
    return dealRepository.findAll();
  }

  @Override
  public Deal createDeal(Deal deal) throws Exception {
    HomeCategory category = homeCategoryRepository.findById(deal.getCategory().getId())
        .orElseThrow(() -> new Exception("Category not found"));
    Deal newDeal = dealRepository.save(deal);

    newDeal.setCategory(category);
    newDeal.setDiscount(deal.getDiscount());
    return dealRepository.save(newDeal);
  }

  @Override
  public Deal updateDeal(Deal deal, Long id) throws Exception {
    Deal existingDeal = dealRepository.findById(id).orElseThrow(() -> new Exception("Deal not found"));

    HomeCategory category = homeCategoryRepository.findById(deal.getCategory().getId())
        .orElseThrow(() -> new Exception("Category not found"));

    if (existingDeal != null) {
      if (deal.getDiscount() != null) {
        existingDeal.setDiscount(deal.getDiscount());
      }
      if (category != null) {
        existingDeal.setCategory(category);
      }

      return dealRepository.save(existingDeal);
    }

    throw new Exception("Deal not found");
  }

  @Override
  public void deleteDeal(Long id) throws Exception {
    Deal deal = dealRepository.findById(id).orElseThrow(() -> new Exception("Deal not found"));
    dealRepository.delete(deal);
  }

}
