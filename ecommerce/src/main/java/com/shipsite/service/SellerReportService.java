package com.shipsite.service;

import com.shipsite.entities.Seller;
import com.shipsite.entities.SellerReport;

public interface SellerReportService {

  SellerReport updateSellerReport(SellerReport sellerReport) throws Exception;

  SellerReport getSellerReport(Seller seller) throws Exception;

}
