package com.shipsite.service.impl;

import org.springframework.stereotype.Service;

import com.shipsite.config.JwtProvider;
import com.shipsite.entities.User;
import com.shipsite.repository.UserRepository;
import com.shipsite.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final JwtProvider jwtProvider;

  @Override
  public User findUserByJwtToken(String jwt) throws Exception {
    String email = jwtProvider.getEmailFromJwtToken(jwt);

    return this.findUserByEmail(email);

  }

  @Override
  public User findUserByEmail(String email) throws Exception {

    User user = userRepository.findByEmail(email);

    if (user == null) {
      throw new Exception("User not found with email - " + email);
    }
    return user;

  }

}
