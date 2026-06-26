package com.shipsite.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shipsite.config.JwtProvider;
import com.shipsite.domain.USER_ROLE;
import com.shipsite.entities.Cart;
import com.shipsite.entities.Seller;
import com.shipsite.entities.User;
import com.shipsite.entities.VerificationCode;
import com.shipsite.repository.CartRepository;
import com.shipsite.repository.SellerRepository;
import com.shipsite.repository.UserRepository;
import com.shipsite.repository.VerificationCodeRepository;
import com.shipsite.request.LoginRequest;
import com.shipsite.request.SignupRequest;
import com.shipsite.response.AuthResponse;
import com.shipsite.service.AuthService;
import com.shipsite.service.EmailService;
import com.shipsite.utils.OtpUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);
  private final SellerRepository sellerRepository;
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;
  private final CartRepository cartRepository;
  private final JwtProvider jwtProvider;
  private final VerificationCodeRepository codeRepository;

  private final EmailService emailService;
  private final CustomUserServiceImpl customUserServiceImpl;

  private final static String SELLER_PREFIX = "seller_";

  @Override
  public String createUser(SignupRequest req) throws Exception {

    VerificationCode verificationCode = codeRepository.findByEmail(req.getEmail());

    if (verificationCode == null || !verificationCode.getOtp().equals(req.getOtp())) {
      throw new Exception("Wrong otp");
    }

    User user = userRepository.findByEmail(req.getEmail());

    if (user == null) {
      User createdUser = new User();
      createdUser.setFullName(req.getFullName());
      createdUser.setEmail(req.getEmail());
      createdUser.setRole(USER_ROLE.ROLE_CUSTOMER);
      createdUser.setMobile(req.getMobile());
      createdUser.setPassword(passwordEncoder.encode(req.getOtp()));

      user = userRepository.save(createdUser);

      Cart cart = new Cart();
      cart.setUser(user);
      cartRepository.save(cart);

    }

    List<GrantedAuthority> authorities = new ArrayList<>();
    authorities.add(new SimpleGrantedAuthority(USER_ROLE.ROLE_CUSTOMER.toString()));

    Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), null, authorities);
    SecurityContextHolder.getContext().setAuthentication(authentication);
    return jwtProvider.generateToken(authentication);
  }

  @Override
  public void sendLoginOtp(String email, USER_ROLE role) throws Exception {
    String SIGNING_PREFIX = "signing_";
    // String SELLER_PREFIX = "seller_ ";

    if (email.startsWith(SIGNING_PREFIX)) {
      email = email.substring(SIGNING_PREFIX.length());
      logger.info("Email: {}", email);

      if (role.equals(USER_ROLE.ROLE_SELLER)) {
        logger.info("Seller email: {}", email);
        Seller seller = sellerRepository.findByEmail(email);
        logger.info("Seller: {}", seller);
        if (seller == null) {
          throw new Exception("Seller does not exist with provided email!!!");
        }
      } else {
        User user = userRepository.findByEmail(email);
        if (user == null) {
          throw new Exception("User does not exist with provided email!!!");
        }
      }
    }

    VerificationCode isExist = codeRepository.findByEmail(email);
    if (isExist != null) {
      codeRepository.delete(isExist);
    }

    String otp = OtpUtil.generateOtp();

    VerificationCode verificationCode = new VerificationCode();
    verificationCode.setEmail(email);
    verificationCode.setOtp(otp);
    codeRepository.save(verificationCode);

    String subject = "ShipSite Login OTP";
    String text = "Your OTP is: " + otp;

    emailService.sendVerificationOtpEmail(email, otp, subject, text);

  }

  @Override
  public AuthResponse signing(LoginRequest req) throws Exception {
    String username = req.getEmail();
    String otp = req.getOtp();

    Authentication authentication = authenticate(username, otp);
    SecurityContextHolder.getContext().setAuthentication(authentication);

    String token = jwtProvider.generateToken(authentication);

    AuthResponse res = new AuthResponse();
    res.setJwt(token);
    res.setMessage("Login Successful!");

    Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
    String roleName = authorities.iterator().next().getAuthority();

    res.setRole(USER_ROLE.valueOf(roleName));
    return res;

  }

  private Authentication authenticate(String username, String otp) throws Exception {

    if (username.startsWith(SELLER_PREFIX)) {
      username = username.substring(SELLER_PREFIX.length());
    }

    UserDetails userDetails = customUserServiceImpl.loadUserByUsername(username);
    if (userDetails == null) {
      throw new Exception("Invalid username");
    }

    VerificationCode verificationCode = codeRepository.findByEmail(username);
    if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
      throw new Exception("Wrong Otp");
    }

    return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
  }

}
