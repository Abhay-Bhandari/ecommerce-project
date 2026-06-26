package com.shipsite.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shipsite.entities.Product;
import com.shipsite.entities.Review;
import com.shipsite.entities.User;
import com.shipsite.request.CreateReviewRequest;
import com.shipsite.response.ApiResponse;
import com.shipsite.service.ProductService;
import com.shipsite.service.ReviewService;
import com.shipsite.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

  private final ReviewService reviewService;
  private final UserService userService;
  private final ProductService productService;

  @GetMapping("products/{productId}/reviews")
  public ResponseEntity<List<Review>> getReviewsByProductId(@PathVariable Long productId) {
    List<Review> reviews = reviewService.getReviewByProductId(productId);
    return ResponseEntity.ok(reviews);
  }

  @PostMapping("products/{productId}/reviews")
  public ResponseEntity<Review> writeReview(@PathVariable Long productId, @RequestBody CreateReviewRequest req,
      @RequestHeader("Authorization") String jwt) throws Exception {

    User user = userService.findUserByJwtToken(jwt);
    Product product = productService.findProductById(productId);

    Review createdReview = reviewService.createReview(req, user, product);

    return ResponseEntity.ok(createdReview);
  }

  @PatchMapping("/reviews/{reviewId}")
  public ResponseEntity<Review> updateReview(@PathVariable Long reviewId, @RequestBody CreateReviewRequest req,
      @RequestHeader("Authorization") String jwt) throws Exception {

    User user = userService.findUserByJwtToken(jwt);

    Review review = reviewService.updateReview(reviewId, req.getReviewText(), req.getReviewRating(), user.getId());
    return ResponseEntity.ok(review);
  }

  @DeleteMapping("/reviews/{reviewId}")
  public ResponseEntity<ApiResponse> deleteReview(@PathVariable Long reviewId, @RequestBody CreateReviewRequest req,
      @RequestHeader("Authorization") String jwt) throws Exception {

    User user = userService.findUserByJwtToken(jwt);

    reviewService.deleteReview(reviewId, user.getId());
    ApiResponse res = new ApiResponse();
    res.setMessage("Review Deleted Successfully!!!");
    return ResponseEntity.ok(res);
  }
}
