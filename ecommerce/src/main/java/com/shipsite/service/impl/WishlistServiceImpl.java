package com.shipsite.service.impl;

import org.springframework.stereotype.Service;

import com.shipsite.entities.Product;
import com.shipsite.entities.User;
import com.shipsite.entities.Wishlist;
import com.shipsite.repository.WistlistRepository;
import com.shipsite.service.WishlistService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WishlistServiceImpl implements WishlistService {

  private final WistlistRepository wishlistRepository;

  @Override
  public Wishlist createWishlist(User user) {
    Wishlist wishlist = new Wishlist();
    wishlist.setUser(user);
    return wishlistRepository.save(wishlist);
  }

  @Override
  public Wishlist getWishlistByUserId(User user) {
    Wishlist wishlist = wishlistRepository.findByUserId(user.getId());
    if (wishlist == null) {
      wishlist = createWishlist(user);
    }
    return wishlist;
  }

  @Override
  public Wishlist addProductToWishlist(User user, Product product) {
    Wishlist wishlist = getWishlistByUserId(user);
    if (wishlist.getProducts().contains(product)) {
      wishlist.getProducts().remove(product);
    } else
      wishlist.getProducts().add(product);
    return wishlistRepository.save(wishlist);
  }

}
