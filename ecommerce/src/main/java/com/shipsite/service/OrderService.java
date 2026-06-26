package com.shipsite.service;

import java.util.List;
import java.util.Set;

import com.shipsite.domain.OrderStatus;
import com.shipsite.entities.Address;
import com.shipsite.entities.Cart;
import com.shipsite.entities.Order;
import com.shipsite.entities.OrderItem;
import com.shipsite.entities.User;

public interface OrderService {

  Set<Order> createOrder(User user, Address shippingAddress, Cart cart);

  Order findByOrderId(Long id) throws Exception;

  List<Order> userOrderHistory(Long userId);

  List<Order> sellersOrder(Long sellerId);

  Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception;

  Order cancelOrder(Long orderId, User user) throws Exception;

  OrderItem getOrderItemById(Long id) throws Exception;

}
