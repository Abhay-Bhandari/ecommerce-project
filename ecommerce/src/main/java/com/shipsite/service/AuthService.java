package com.shipsite.service;

import com.shipsite.domain.USER_ROLE;
import com.shipsite.request.LoginRequest;
import com.shipsite.request.SignupRequest;
import com.shipsite.response.AuthResponse;

public interface AuthService {

  void sendLoginOtp(String email, USER_ROLE role) throws Exception;

  String createUser(SignupRequest req) throws Exception;

  AuthResponse signing(LoginRequest req) throws Exception;
}
