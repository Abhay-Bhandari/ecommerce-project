package com.shipsite.service.impl;

import org.springframework.stereotype.Service;

import com.shipsite.entities.Cart;
import com.shipsite.entities.CartItem;
import com.shipsite.entities.Product;
import com.shipsite.entities.User;
import com.shipsite.repository.CartItemRepository;
import com.shipsite.repository.CartRepository;
import com.shipsite.service.CartService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

  private final CartRepository cartRepository;
  private final CartItemRepository cartItemRepository;

  @Override
  public CartItem addCartItem(User user, Product product, String size, int quantity) throws Exception {
    Cart cart = findUserCart(user);
    CartItem isPresent = cartItemRepository.findByCartAndProductAndSize(cart, product, size);

    if (isPresent == null) {
      CartItem cartItem = new CartItem();
      cartItem.setProduct(product);
      cartItem.setSize(size);
      cartItem.setQuantity(quantity);
      cartItem.setUserId(user.getId());

      int totalPrice = quantity * product.getSellingPrice();
      cartItem.setSellingPrice(totalPrice);
      cartItem.setMrpPrice(quantity * product.getMrpPrice());
      cart.getCartItems().add(cartItem);
      cartItem.setCart(cart);

      return cartItemRepository.save(cartItem);
    }

    return isPresent;

  }

  @Override
  public Cart findUserCart(User user) {
    Cart cart = cartRepository.findByUserId(user.getId());

    int totalPrice = 0;
    int totalDiscountPrice = 0;
    int totalItem = 0;

    for (CartItem cartItem : cart.getCartItems()) {
      totalPrice += cartItem.getMrpPrice();
      totalDiscountPrice += cartItem.getSellingPrice();
      totalItem += cartItem.getQuantity();
    }

    cart.setTotalMrpPrice(totalPrice);
    cart.setTotalSellingPrice(totalDiscountPrice);
    cart.setTotalItem(totalItem);
    cart.setDiscount(calculateDiscountPercentage(totalPrice, totalDiscountPrice));

    return cart;
  }

  private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
    if (mrpPrice <= 0) {
      return 0;
    }
    double discount = ((mrpPrice - sellingPrice) * 100) / mrpPrice;
    return (int) discount;
  }

}
