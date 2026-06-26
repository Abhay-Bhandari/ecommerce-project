package com.shipsite.service.impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shipsite.config.JwtProvider;
import com.shipsite.domain.AccountStatus;
import com.shipsite.domain.USER_ROLE;
import com.shipsite.entities.Address;
import com.shipsite.entities.Seller;
import com.shipsite.exceptions.SellerException;
import com.shipsite.repository.AddressRepository;
import com.shipsite.repository.SellerRepository;
import com.shipsite.service.SellerService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {

  private final SellerRepository sellerRepository;
  private final JwtProvider jwtProvider;
  private final PasswordEncoder encoder;
  private final AddressRepository addressRepository;

  @Override
  public Seller getSellerProfile(String jwt) throws Exception {
    String email = jwtProvider.getEmailFromJwtToken(jwt);
    return this.getSellerByEmail(email);
  }

  @Override
  public Seller createSeller(Seller seller) throws Exception {
    Seller sellerExist = sellerRepository.findByEmail(seller.getEmail());
    if (sellerExist != null) {
      throw new RuntimeException("Seller already exist, use different email!!");
    }
    Address savedAddress = addressRepository.save(seller.getPickupAddress());

    Seller newSeller = new Seller();
    newSeller.setEmail(seller.getEmail());
    newSeller.setPassword(encoder.encode(seller.getPassword()));
    newSeller.setSellerName(seller.getSellerName());
    newSeller.setPickupAddress(savedAddress);
    newSeller.setGSTIN(seller.getGSTIN());
    newSeller.setRole(USER_ROLE.ROLE_SELLER);
    newSeller.setMobile(seller.getMobile());
    newSeller.setBusinessDetails(seller.getBusinessDetails());
    newSeller.setBankDetails(seller.getBankDetails());

    return sellerRepository.save(newSeller);

  }

  @Override
  public Seller getSellerById(Long id) throws SellerException {
    return sellerRepository.findById(id).orElseThrow(() -> new SellerException("Seller not found with id: " + id));
  }

  @Override
  public Seller updateSeller(Long id, Seller seller) throws Exception {
    Seller existingSeller = this.getSellerById(id);

    if (seller.getSellerName() != null) {
      existingSeller.setSellerName(seller.getSellerName());
    }
    if (seller.getEmail() != null) {
      existingSeller.setEmail(seller.getEmail());
    }
    if (seller.getMobile() != null) {
      existingSeller.setMobile(seller.getMobile());
    }
    if (seller.getPickupAddress() != null && seller.getPickupAddress().getAddress() != null
        && seller.getPickupAddress().getMobile() != null && seller.getPickupAddress().getCity() != null
        && seller.getPickupAddress().getState() != null && seller.getPickupAddress().getPincode() != null) {
      existingSeller.getPickupAddress().setAddress(seller.getPickupAddress().getAddress());
      existingSeller.getPickupAddress().setMobile(seller.getPickupAddress().getMobile());
      existingSeller.getPickupAddress().setCity(seller.getPickupAddress().getCity());
      existingSeller.getPickupAddress().setState(seller.getPickupAddress().getState());
      existingSeller.getPickupAddress().setPincode(seller.getPickupAddress().getPincode());
    }
    if (seller.getBusinessDetails() != null && seller.getBusinessDetails().getBusinessName() != null) {
      existingSeller.getBusinessDetails().setBusinessName(seller.getBusinessDetails().getBusinessName());
    }
    if (seller.getBankDetails() != null && seller.getBankDetails().getAccountHolderName() != null
        && seller.getBankDetails().getIfscCode() != null && seller.getBankDetails().getAccountNumber() != null) {
      existingSeller.getBankDetails().setAccountHolderName(seller.getBankDetails().getAccountHolderName());
      existingSeller.getBankDetails().setIfscCode(seller.getBankDetails().getIfscCode());
      existingSeller.getBankDetails().setAccountNumber(seller.getBankDetails().getAccountNumber());
    }
    return sellerRepository.save(existingSeller);
  }

  @Override
  public Seller getSellerByEmail(String email) throws Exception {
    Seller seller = sellerRepository.findByEmail(email);
    if (seller == null) {
      throw new Exception("Seller not found....");
    }
    return seller;
  }

  @Override
  public List<Seller> getAllSellers(AccountStatus status) {
    return sellerRepository.findAllByAccountStatus(status);
  }

  @Override
  public void deleteSeller(Long id) throws Exception {
    Seller seller = getSellerById(id);
    sellerRepository.delete(seller);
  }

  @Override
  public Seller verifyEmail(String email, String otp) throws Exception {
    Seller seller = getSellerByEmail(email);
    seller.setEmailVerified(true);
    return sellerRepository.save(seller);
  }

  @Override
  public Seller updateSellerAccountStatus(Long id, AccountStatus status) throws Exception {
    Seller seller = getSellerById(id);
    seller.setAccountStatus(status);
    return sellerRepository.save(seller);
  }

}
