package com.shipsite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shipsite.domain.AccountStatus;
import com.shipsite.entities.Seller;

public interface SellerRepository extends JpaRepository<Seller, Long> {

  Seller findByEmail(String email);

  List<Seller> findAllByAccountStatus(AccountStatus status);
}
