package com.shipsite.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shipsite.entities.Seller;
import com.shipsite.entities.Transaction;
import com.shipsite.service.SellerService;
import com.shipsite.service.TransactionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

  private final TransactionService transactionService;
  private final SellerService sellerService;

  @GetMapping("/seller")
  public ResponseEntity<List<Transaction>> getTransactionsBySeller(@RequestHeader("Authorization") String jwt)
      throws Exception {
    Seller seller = sellerService.getSellerProfile(jwt);

    List<Transaction> transactions = transactionService.getTransactionBySellerId(seller);

    return ResponseEntity.ok(transactions);
  }

  @GetMapping
  public ResponseEntity<List<Transaction>> getAllTransactions() throws Exception {
    List<Transaction> transactions = transactionService.getAllTransactions();
    return ResponseEntity.ok(transactions);
  }
}