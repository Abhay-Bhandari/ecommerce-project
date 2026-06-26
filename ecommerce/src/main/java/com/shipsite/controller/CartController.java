package com.shipsite.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shipsite.entities.Cart;
import com.shipsite.entities.CartItem;
import com.shipsite.entities.Product;
import com.shipsite.entities.User;
import com.shipsite.request.AddItemRequest;
import com.shipsite.response.ApiResponse;
import com.shipsite.service.CartItemService;
import com.shipsite.service.CartService;
import com.shipsite.service.ProductService;
import com.shipsite.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cart")
public class CartController {

  private final CartService cartService;
  private final CartItemService cartItemService;
  private final UserService userService;
  private final ProductService productService;

  @GetMapping
  public ResponseEntity<Cart> findUserCartHandler(@RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    Cart cart = cartService.findUserCart(user);
    return new ResponseEntity<Cart>(cart, HttpStatus.OK);
  }

  @PutMapping("/add")
  public ResponseEntity<CartItem> addItemToCart(@RequestBody AddItemRequest req,
      @RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    Product product = productService.findProductById(req.getProductId());

    CartItem item = cartService.addCartItem(user, product, req.getSize(), req.getQuantity());

    ApiResponse response = new ApiResponse();
    response.setMessage("Item added to cart successfully");
    return new ResponseEntity<>(item, HttpStatus.ACCEPTED);
  }

  @DeleteMapping("/item/{cartItemId}")
  public ResponseEntity<ApiResponse> deleteCartItemHandler(@PathVariable Long cartItemId,
      @RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    cartItemService.removeCartItem(user.getId(), cartItemId);
    ApiResponse response = new ApiResponse();
    response.setMessage("Item removed from cart successfully");
    return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
  }

  @PutMapping("/item/{cartItemId}")
  public ResponseEntity<CartItem> updateCartItemHandler(@PathVariable Long cartItemId,
      @RequestBody CartItem cartItem,
      @RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);

    CartItem updatedCartItem = null;
    if (cartItem.getQuantity() > 0) {
      updatedCartItem = cartItemService.updateCartItem(user.getId(), cartItemId, cartItem);
    }

    return new ResponseEntity<>(updatedCartItem, HttpStatus.ACCEPTED);
  }
}
