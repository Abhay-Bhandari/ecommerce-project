package com.shipsite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shipsite.entities.Deal;

public interface DealRepository extends JpaRepository<Deal, Long> {

}
