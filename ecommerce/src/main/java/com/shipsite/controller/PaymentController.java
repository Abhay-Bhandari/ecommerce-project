package com.shipsite.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shipsite.entities.Order;
import com.shipsite.entities.PaymentOrder;
import com.shipsite.entities.Seller;
import com.shipsite.entities.SellerReport;
import com.shipsite.entities.User;
import com.shipsite.response.ApiResponse;
import com.shipsite.response.PaymentLinkResponse;
import com.shipsite.service.PaymentService;
import com.shipsite.service.SellerReportService;
import com.shipsite.service.SellerService;
import com.shipsite.service.TransactionService;
import com.shipsite.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

  private final PaymentService paymentService;
  private final UserService userService;
  private final SellerService sellerService;
  private final SellerReportService reportService;
  private final TransactionService transactionService;

  @GetMapping("/{paymentId}")
  public ResponseEntity<ApiResponse> paymentSuccessHandler(@PathVariable String paymentId,
      @RequestParam String paymentLinkId, @RequestHeader("Authorization") String jwt) throws Exception {

    User user = userService.findUserByJwtToken(jwt);

    PaymentLinkResponse paymentResponse;

    PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentLinkId);

    boolean paymentSuccess = paymentService.proceedPaymentOrder(paymentOrder, paymentId, paymentLinkId);

    if (paymentSuccess) {
      for (Order order : paymentOrder.getOrders()) {
        transactionService.createTransaction(order);

        Seller seller = sellerService.getSellerById(order.getSellerId());
        SellerReport report = reportService.getSellerReport(seller);
        report.setTotalOrders(report.getTotalOrders() + 1);
        report.setTotalEarnings(report.getTotalEarnings() + order.getTotalItem());
        report.setTotalSales(report.getTotalSales() + order.getOrderItems().size());
        reportService.updateSellerReport(report);

      }
    }

    ApiResponse apiResponse = new ApiResponse();
    apiResponse.setMessage("Payment Successful!!");
    return new ResponseEntity<>(apiResponse, HttpStatus.OK);

  }

}
