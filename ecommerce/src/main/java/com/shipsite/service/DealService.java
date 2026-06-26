package com.shipsite.service;

import java.util.List;

import com.shipsite.entities.Deal;

public interface DealService {

  List<Deal> getDeals();

  Deal createDeal(Deal deal) throws Exception;

  Deal updateDeal(Deal deal, Long id) throws Exception;

  void deleteDeal(Long id) throws Exception;
}
