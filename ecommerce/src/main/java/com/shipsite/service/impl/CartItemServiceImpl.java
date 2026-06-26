package com.shipsite.service.impl;

import org.springframework.stereotype.Service;

import com.shipsite.entities.CartItem;
import com.shipsite.entities.User;
import com.shipsite.repository.CartItemRepository;
import com.shipsite.service.CartItemService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartItemServiceImpl implements CartItemService {

  private final CartItemRepository cartItemRepository;

  @Override
  public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws Exception {
    CartItem item = findCartItemById(id);

    User cartItemUser = item.getCart().getUser();

    if (cartItemUser.getId().equals(userId)) {
      item.setQuantity(cartItem.getQuantity());
      item.setMrpPrice(item.getQuantity() * item.getProduct().getMrpPrice());
      item.setSellingPrice(item.getQuantity() * item.getProduct().getSellingPrice());
      return cartItemRepository.save(item);
    }
    throw new Exception("You can't update this cart item");
  }

  @Override
  public void removeCartItem(Long userId, Long cartItemId) throws Exception {
    CartItem item = findCartItemById(cartItemId);

    User cartItemUser = item.getCart().getUser();

    if (cartItemUser.getId().equals(userId)) {
      cartItemRepository.delete(item);
      return;
    }
    throw new Exception("You can't remove this cart item");
  }

  @Override
  public CartItem findCartItemById(Long id) throws Exception {
    CartItem item = cartItemRepository.findById(id)
        .orElseThrow(() -> new Exception("Cart item not found with id: " + id));
    return item;
  }

}
