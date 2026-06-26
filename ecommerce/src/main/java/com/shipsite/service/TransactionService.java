package com.shipsite.service;

import java.util.List;

import com.shipsite.entities.Order;
import com.shipsite.entities.Seller;
import com.shipsite.entities.Transaction;

public interface TransactionService {
  Transaction createTransaction(Order order);

  List<Transaction> getTransactionBySellerId(Seller seller);

  List<Transaction> getAllTransactions();
}
