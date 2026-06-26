package com.shipsite.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shipsite.entities.Deal;
import com.shipsite.response.ApiResponse;
import com.shipsite.service.DealService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/deals")
public class DealController {

  private final DealService dealService;

  @PostMapping
  public ResponseEntity<Deal> createDeals(@RequestBody Deal deal) throws Exception {
    Deal createdDeals = dealService.createDeal(deal);
    return new ResponseEntity<>(createdDeals, HttpStatus.ACCEPTED);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Deal> updateDeal(@RequestBody Deal deal, @PathVariable Long id) throws Exception {
    Deal updatedDeal = dealService.updateDeal(deal, id);
    return new ResponseEntity<>(updatedDeal, HttpStatus.ACCEPTED);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ApiResponse> deleteDeals(@PathVariable Long id) throws Exception {
    dealService.deleteDeal(id);
    ApiResponse response = new ApiResponse();
    response.setMessage("Deal deleted successfully");
    return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
  }
}
