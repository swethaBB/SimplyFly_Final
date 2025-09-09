package com.hexaware.simplyfly.services;

import com.hexaware.simplyfly.dto.PaymentDto;
import com.hexaware.simplyfly.entities.Payment;

public interface IPaymentService {
    PaymentDto pay(PaymentDto dto);
    PaymentDto getPaymentById(Long id);
    void refund(Long paymentId);
    String initiatePayment(Long bookingId, Double amount);
    Payment getPaymentByBookingId(Long bookingId);

}
