package com.shipsite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shipsite.entities.HomeCategory;

public interface HomeCategoryRepository extends JpaRepository<HomeCategory, Long> {

}
