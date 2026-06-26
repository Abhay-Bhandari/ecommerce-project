package com.shipsite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shipsite.entities.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
