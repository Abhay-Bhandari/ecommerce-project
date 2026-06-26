package com.shipsite.response;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class PaymentLinkResponse {
  private String payment_link_url;
  private String payment_link_id;
}
