package com.shipsite.service;

import com.shipsite.entities.User;

public interface UserService {

  User findUserByJwtToken(String jwt) throws Exception;

  User findUserByEmail(String email) throws Exception;
}
