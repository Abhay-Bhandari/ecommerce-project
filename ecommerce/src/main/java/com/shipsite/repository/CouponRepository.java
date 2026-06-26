package com.shipsite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shipsite.entities.Coupon;

public interface CouponRepository extends JpaRepository<Coupon, Long> {

  Coupon findByCode(String code);
}
