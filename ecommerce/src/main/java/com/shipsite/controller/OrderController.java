package com.shipsite.controller;

import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.PaymentLink;
import com.shipsite.domain.PaymentMethod;
import com.shipsite.entities.Address;
import com.shipsite.entities.Cart;
import com.shipsite.entities.Order;
import com.shipsite.entities.OrderItem;
import com.shipsite.entities.PaymentOrder;
import com.shipsite.entities.User;
import com.shipsite.repository.PaymentOrderRepository;
import com.shipsite.response.PaymentLinkResponse;
import com.shipsite.service.CartService;
import com.shipsite.service.OrderService;
import com.shipsite.service.PaymentService;
import com.shipsite.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {

  private final OrderService orderService;
  private final UserService userService;
  private final CartService cartService;
  private final PaymentService paymentService;
  private final PaymentOrderRepository paymentOrderRepository;

  @PostMapping()
  public ResponseEntity<PaymentLinkResponse> createOrderHandler(@RequestBody Address shippingAddress,
      @RequestParam PaymentMethod paymentMethod, @RequestHeader("Authorization") String jwt) throws Exception {

    User user = userService.findUserByJwtToken(jwt);
    Cart cart = cartService.findUserCart(user);
    Set<Order> orders = orderService.createOrder(user, shippingAddress, cart);

    PaymentOrder paymentOrder = paymentService.createOrder(user, orders);

    PaymentLinkResponse res = new PaymentLinkResponse();

    if (paymentMethod.equals(PaymentMethod.RAZORPAY)) {
      PaymentLink payment = paymentService.createRazorpayPaymentLink(user, paymentOrder.getAmount(),
          paymentOrder.getId());

      String paymentUrl = payment.get("short_url");
      String paymentUrlId = payment.get("id");

      res.setPayment_link_url(paymentUrl);

      paymentOrder.setPaymentLinkedId(paymentUrl);

      paymentOrderRepository.save(paymentOrder);

    } else {
      String paymentUrl = paymentService.createStripePaymentLink(user, paymentOrder.getAmount(), paymentOrder.getId());

      res.setPayment_link_url(paymentUrl);
    }
    return new ResponseEntity<>(res, HttpStatus.OK);
  }

  @GetMapping("/user")
  public ResponseEntity<List<Order>> userOrderHistoryHandler(@RequestHeader("Authorization") String jwt)
      throws Exception {

    User user = userService.findUserByJwtToken(jwt);
    List<Order> orders = orderService.userOrderHistory(user.getId());
    return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
  }

  @GetMapping("/{orderId}")
  public ResponseEntity<Order> getOrderById(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt)
      throws Exception {

    User user = userService.findUserByJwtToken(jwt);
    Order orders = orderService.findByOrderId(orderId);
    return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
  }

  @GetMapping("/item/{orderItemId}")
  public ResponseEntity<OrderItem> getOrderItemById(@PathVariable Long orderItemId,
      @RequestHeader("Authorization") String jwt) throws Exception {

    User user = userService.findUserByJwtToken(jwt);
    OrderItem orderItem = orderService.getOrderItemById(orderItemId);
    return new ResponseEntity<>(orderItem, HttpStatus.ACCEPTED);
  }

  @PutMapping("/{orderId}/cancel")
  public ResponseEntity<Order> cancelOrder(@PathVariable Long orderId, @RequestHeader("Authorization") String jwt)
      throws Exception {

    User user = userService.findUserByJwtToken(jwt);
    Order order = orderService.cancelOrder(orderId, user);

    return new ResponseEntity<>(order, HttpStatus.ACCEPTED);
  }
}
