package com.shipsite.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shipsite.entities.Product;
import com.shipsite.entities.Seller;
import com.shipsite.request.CreateProductRequest;
import com.shipsite.service.ProductService;
import com.shipsite.service.SellerService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/sellers/products")
@RequiredArgsConstructor
public class SellerProductController {

  private final ProductService productService;
  private final SellerService sellerService;

  @GetMapping
  public ResponseEntity<List<Product>> getProductBySellerId(@RequestHeader("Authorization") String jwt)
      throws Exception {

    Seller seller = sellerService.getSellerProfile(jwt);

    List<Product> products = productService.getProductBySellerId(seller.getId());
    return new ResponseEntity<>(products, HttpStatus.OK);

  }

  @PostMapping
  public ResponseEntity<Product> createProduct(@RequestBody CreateProductRequest req,
      @RequestHeader("Authorization") String jwt)
      throws Exception {
    Seller seller = sellerService.getSellerProfile(jwt);
    Product createdProduct = productService.createProduct(req, seller);
    return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
  }

  @PutMapping("/{productId}")
  public ResponseEntity<Product> updateProduct(@PathVariable Long productId, @RequestBody Product product,
      @RequestHeader("Authorization") String jwt) throws Exception {

    Product updatedProduct = productService.updateProduct(productId, product);
    return new ResponseEntity<>(updatedProduct, HttpStatus.OK);

  }

}
