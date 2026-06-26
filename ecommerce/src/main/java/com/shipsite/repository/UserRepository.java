package com.shipsite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shipsite.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

  User findByEmail(String email);
}
