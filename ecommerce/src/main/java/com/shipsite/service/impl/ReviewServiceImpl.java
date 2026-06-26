package com.shipsite.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.shipsite.entities.Product;
import com.shipsite.entities.Review;
import com.shipsite.entities.User;
import com.shipsite.repository.ReviewRepository;
import com.shipsite.request.CreateReviewRequest;
import com.shipsite.service.ReviewService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

  private final ReviewRepository reviewRepository;

  @Override
  public Review createReview(CreateReviewRequest createReviewRequest, User user, Product product) {
    Review review = new Review();
    review.setReviewText(createReviewRequest.getReviewText());
    review.setRating(createReviewRequest.getReviewRating());
    review.setProductImages(createReviewRequest.getProductImages());
    review.setUser(user);
    review.setProduct(product);
    product.getReviews().add(review);
    return reviewRepository.save(review);
  }

  @Override
  public List<Review> getReviewByProductId(Long productId) {
    return reviewRepository.findByProductId(productId);
  }

  @Override
  public Review updateReview(Long reviewId, String reviewText, double rating, Long userId) throws Exception {
    Review review = getReviewById(reviewId);
    if (review.getUser().getId().equals(userId)) {
      review.setReviewText(reviewText);
      review.setRating(rating);
      return reviewRepository.save(review);
    }
    throw new Exception("You can't update this review");
  }

  @Override
  public void deleteReview(Long reviewId, Long userId) throws Exception {
    Review review = getReviewById(reviewId);
    if (!review.getUser().getId().equals(userId)) {
      throw new Exception("You can't delete this review");
    }
    reviewRepository.delete(review);
  }

  @Override
  public Review getReviewById(Long reviewId) throws Exception {
    return reviewRepository.findById(reviewId).orElseThrow(() -> new Exception("Review not found"));
  }

}
