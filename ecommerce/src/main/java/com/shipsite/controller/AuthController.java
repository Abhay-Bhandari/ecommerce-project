package com.shipsite.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shipsite.domain.USER_ROLE;
import com.shipsite.request.LoginOtpRequest;
import com.shipsite.request.LoginRequest;
import com.shipsite.request.SignupRequest;
import com.shipsite.response.ApiResponse;
import com.shipsite.response.AuthResponse;
import com.shipsite.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;

  @PostMapping("/signup")
  public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest req) throws Exception {

    String jwt = authService.createUser(req);
    AuthResponse res = new AuthResponse();
    res.setJwt(jwt);
    res.setMessage("User created successfully");
    res.setRole(USER_ROLE.ROLE_CUSTOMER);
    return ResponseEntity.ok(res);

  }

  @PostMapping("/sent/login-signup-otp")
  public ResponseEntity<ApiResponse> sentOtpHandler(@RequestBody LoginOtpRequest req) throws Exception {

    authService.sendLoginOtp(req.getEmail(), req.getRole());
    ApiResponse res = new ApiResponse();
    res.setMessage("Otp send successfully!!");
    return ResponseEntity.ok(res);
  }

  @PostMapping("/sent/signing")
  public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest req) throws Exception {

    AuthResponse authResponse = authService.signing(req);

    return ResponseEntity.ok(authResponse);
  }
}
