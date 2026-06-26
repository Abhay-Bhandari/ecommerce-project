package com.shipsite.entities;

import java.util.HashSet;
import java.util.Set;

import com.shipsite.domain.PaymentMethod;
import com.shipsite.domain.PaymentOrderStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class PaymentOrder {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long amount;

  private PaymentOrderStatus status = PaymentOrderStatus.PENDING;

  private PaymentMethod paymentMethod;

  private String paymentLinkedId;

  @ManyToOne
  private User user;

  @OneToMany
  private Set<Order> orders = new HashSet<>();

}
