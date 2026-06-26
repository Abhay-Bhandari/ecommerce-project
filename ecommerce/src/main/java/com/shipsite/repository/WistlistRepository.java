package com.shipsite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shipsite.entities.Wishlist;

public interface WistlistRepository extends JpaRepository<Wishlist, Long> {

  Wishlist findByUserId(Long userId);

}
