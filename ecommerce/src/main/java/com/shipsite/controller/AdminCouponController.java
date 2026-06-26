package com.shipsite.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shipsite.entities.Cart;
import com.shipsite.entities.Coupon;
import com.shipsite.entities.User;
import com.shipsite.service.CouponService;
import com.shipsite.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/coupons")
@RequiredArgsConstructor
public class AdminCouponController {

  private final UserService userService;
  private final CouponService couponService;

  @PostMapping("/apply")
  public ResponseEntity<Cart> applyCoupon(@RequestParam String apply, @RequestParam String code,
      @RequestParam double orderValue, @RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    Cart cart;

    if (apply.equals("true")) {
      cart = couponService.applyCoupon(code, orderValue, user);
    } else {
      cart = couponService.removeCoupon(code, user);
    }
    return ResponseEntity.ok(cart);
  }

  @PostMapping("/add")
  public ResponseEntity<Coupon> createCoupon(@RequestBody Coupon coupon) {
    Coupon createdCoupon = couponService.createCoupon(coupon);
    return ResponseEntity.ok(createdCoupon);
  }

  @DeleteMapping("/admin/delete/{id}")
  public ResponseEntity<Void> deleteCoupon(@PathVariable Long id) throws Exception {
    couponService.deleteCoupon(id);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/admin/all")
  public ResponseEntity<List<Coupon>> getAllCoupons() {
    List<Coupon> coupons = couponService.findAllCoupons();
    return ResponseEntity.ok(coupons);
  }
}
