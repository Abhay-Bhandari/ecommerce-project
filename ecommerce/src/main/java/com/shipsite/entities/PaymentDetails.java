package com.shipsite.entities;

import com.shipsite.domain.PaymentStatus;

import lombok.Data;

@Data
public class PaymentDetails {

  private String paymentId;
  private String razorpayPaymentLinkId;
  private String razorpayPaymentLinkRefrenceId;
  private String razorpayPaymentLinkStatus;
  private String razorpayPaymentIdZWSP;
  private PaymentStatus status;
}
