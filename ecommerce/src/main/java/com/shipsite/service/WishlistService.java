package com.shipsite.service;

import com.shipsite.entities.Product;
import com.shipsite.entities.User;
import com.shipsite.entities.Wishlist;

public interface WishlistService {

  Wishlist createWishlist(User user);

  Wishlist getWishlistByUserId(User user);

  Wishlist addProductToWishlist(User user, Product product);

}
