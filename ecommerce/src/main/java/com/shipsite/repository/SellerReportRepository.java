package com.shipsite.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shipsite.entities.SellerReport;

public interface SellerReportRepository extends JpaRepository<SellerReport, Long> {

  SellerReport findBySellerId(Long sellerId);

}
