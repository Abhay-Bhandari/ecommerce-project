package com.shipsite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shipsite.entities.Cart;
import com.shipsite.entities.CartItem;
import com.shipsite.entities.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

  CartItem findByCartAndProductAndSize(Cart cart, Product product, String size);
}
