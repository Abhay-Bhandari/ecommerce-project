package com.shipsite.service.impl;

import org.springframework.stereotype.Service;

import com.shipsite.entities.Seller;
import com.shipsite.entities.SellerReport;
import com.shipsite.repository.SellerReportRepository;
import com.shipsite.service.SellerReportService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SellerReportServiceImpl implements SellerReportService {

  private final SellerReportRepository sellerReportRepository;

  @Override
  public SellerReport updateSellerReport(SellerReport sellerReport) throws Exception {
    return sellerReportRepository.save(sellerReport);
  }

  @Override
  public SellerReport getSellerReport(Seller seller) throws Exception {
    SellerReport sr = sellerReportRepository.findBySellerId(seller.getId());
    if (sr == null) {
      SellerReport newReport = new SellerReport();
      newReport.setSeller(seller);
      return sellerReportRepository.save(newReport);
    }
    return sr;
  }

}
