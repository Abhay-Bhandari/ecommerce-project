package com.shipsite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shipsite.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

  List<Order> findByUserId(Long userId);

  List<Order> findBySellerId(Long sellerId);
}
