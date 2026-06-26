package com.shipsite.service;

import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

  private final JavaMailSender mailSender;

  public void sendVerificationOtpEmail(String userEmail, String otp, String subject, String text)
      throws MessagingException {

    try {
      MimeMessage mimeMessage = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
      helper.setSubject(subject);
      helper.setTo(userEmail);
      helper.setText(text, true);
      mailSender.send(mimeMessage);

    } catch (MailException e) {
      throw new MailSendException("Failed to send verification OTP email");
    }
  }
}
