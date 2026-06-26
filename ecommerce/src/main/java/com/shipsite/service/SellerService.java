package com.shipsite.service;

import java.util.List;

import com.shipsite.domain.AccountStatus;
import com.shipsite.entities.Seller;
import com.shipsite.exceptions.SellerException;

public interface SellerService {

  Seller getSellerProfile(String jwt) throws Exception;

  Seller updateSeller(Long id, Seller seller) throws Exception;

  Seller createSeller(Seller seller) throws Exception;

  Seller getSellerById(Long id) throws SellerException;

  Seller getSellerByEmail(String email) throws Exception;

  List<Seller> getAllSellers(AccountStatus status);

  void deleteSeller(Long id) throws Exception;

  Seller verifyEmail(String email, String otp) throws Exception;

  Seller updateSellerAccountStatus(Long id, AccountStatus status) throws Exception;

}