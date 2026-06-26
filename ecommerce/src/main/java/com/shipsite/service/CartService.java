package com.shipsite.service;

import com.shipsite.entities.Cart;
import com.shipsite.entities.CartItem;
import com.shipsite.entities.Product;
import com.shipsite.entities.User;

public interface CartService {

  public CartItem addCartItem(User user, Product product, String size, int quantity) throws Exception;

  public Cart findUserCart(User user);
}