package com.shipsite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shipsite.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
