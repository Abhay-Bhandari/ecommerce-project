package com.shipsite.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shipsite.entities.Product;
import com.shipsite.entities.User;
import com.shipsite.entities.Wishlist;
import com.shipsite.service.ProductService;
import com.shipsite.service.UserService;
import com.shipsite.service.WishlistService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {

  private final WishlistService wishlistService;
  private final UserService userService;
  private final ProductService productService;

  // @PostMapping("/create")
  // public ResponseEntity<Wishlist> createWishlist(@RequestBody User user) {

  // Wishlist wishlist = wishlistService.createWishlist(user);
  // return ResponseEntity.ok(wishlist);
  // }

  @GetMapping
  public ResponseEntity<Wishlist> getWishlistByUserId(@RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);

    Wishlist wishlist = wishlistService.getWishlistByUserId(user);
    return ResponseEntity.ok(wishlist);
  }

  @PostMapping("/add-product/{productId}")
  public ResponseEntity<Wishlist> addProductToWishlist(@PathVariable Long productId,
      @RequestHeader("Authorization") String jwt) throws Exception {
    Product product = productService.findProductById(productId);
    User user = userService.findUserByJwtToken(jwt);

    Wishlist updatedWishlist = wishlistService.addProductToWishlist(user, product);
    return ResponseEntity.ok(updatedWishlist);
  }
}
