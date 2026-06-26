package com.shipsite.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shipsite.entities.Order;
import com.shipsite.entities.Seller;
import com.shipsite.entities.Transaction;
import com.shipsite.repository.SellerRepository;
import com.shipsite.repository.TransactionRepository;
import com.shipsite.service.TransactionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

  private final TransactionRepository transactionRepository;
  private final SellerRepository sellerRepository;

  @Override
  public Transaction createTransaction(Order order) {
    Seller seller = sellerRepository.findById(order.getSellerId()).get();
    Transaction transaction = new Transaction();
    transaction.setOrder(order);
    transaction.setSeller(seller);
    transaction.setCustomer(order.getUser());

    return transactionRepository.save(transaction);

  }

  @Override
  public List<Transaction> getTransactionBySellerId(Seller seller) {
    return transactionRepository.findBySellerId(seller.getId());
  }

  @Override
  public List<Transaction> getAllTransactions() {
    return transactionRepository.findAll();
  }

}
