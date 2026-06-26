package com.shipsite.service;

import java.util.Set;

import com.razorpay.PaymentLink;
import com.shipsite.entities.Order;
import com.shipsite.entities.PaymentOrder;
import com.shipsite.entities.User;

public interface PaymentService {

  PaymentOrder createOrder(User user, Set<Order> orders);

  PaymentOrder getPaymentOrderById(Long orderId) throws Exception;

  PaymentOrder getPaymentOrderByPaymentId(String orderId) throws Exception;

  boolean proceedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) throws Exception;

  PaymentLink createRazorpayPaymentLink(User user, Long amount, Long orderId) throws Exception;

  String createStripePaymentLink(User user, Long amount, Long orderId) throws Exception;
}
