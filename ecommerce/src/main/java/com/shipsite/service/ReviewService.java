package com.shipsite.service;

import java.util.List;

import com.shipsite.entities.Product;
import com.shipsite.entities.Review;
import com.shipsite.entities.User;
import com.shipsite.request.CreateReviewRequest;

public interface ReviewService {
  Review createReview(CreateReviewRequest createReviewRequest, User user, Product product);

  List<Review> getReviewByProductId(Long productId);

  Review updateReview(Long reviewId, String reviewText, double rating, Long userId) throws Exception;

  void deleteReview(Long reviewId, Long userId) throws Exception;

  Review getReviewById(Long reviewId) throws Exception;

}
